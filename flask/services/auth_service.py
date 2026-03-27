import bcrypt, jwt, datetime, json
from functools import wraps
from flask import request, jsonify
from config import Config
from models import find_by_email, create_user, update_status as set_status, save_empreinte

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token: return jsonify({"error": "Token manquant"}), 401
        try:
            payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            request.user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expiré"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token invalide"}), 401
        return f(*args, **kwargs)
    return decorated

def role_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if request.user.get("role") not in roles:
                return jsonify({"error": "Accès refusé"}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator

def register(nom, prenom, email, mot_de_passe, role, vecteur):
    if find_by_email(email): return {"error": "Email déjà utilisé"}, 400
    h = bcrypt.hashpw(mot_de_passe.encode(), bcrypt.gensalt()).decode()
    uid = create_user(nom, prenom, email, h, role)
    save_empreinte(uid, json.dumps(vecteur))
    return {"id": uid, "message": "Compte créé, en attente d'activation"}, 201

def login(email, mot_de_passe):
    u = find_by_email(email)
    if not u or not bcrypt.checkpw(mot_de_passe.encode(), u[4].encode()):
        return {"error": "Identifiants invalides"}, 401
    if u[6] == "inactif":
        return {"error": "Compte inactif, contactez l'administrateur"}, 403
    token = jwt.encode(
        {"id": u[0], "role": u[5], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)},
        Config.JWT_SECRET, algorithm="HS256")
    return {"token": token}, 200

def update_status(uid, status):
    if status not in ("actif", "inactif"): return {"error": "Statut invalide"}, 400
    set_status(uid, status)
    return {"message": f"Compte {status}"}, 200