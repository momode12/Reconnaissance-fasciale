import json, numpy as np
from models import save_empreinte, get_all_empreintes

def enregistrer(user_id, vecteur: list):
    save_empreinte(user_id, json.dumps(vecteur))
    return {"message": "Empreinte enregistrée"}, 200

def identifier(vecteur: list, seuil=0.6):
    v1 = np.array(vecteur)
    for uid, vec in get_all_empreintes():
        dist = np.linalg.norm(v1 - np.array(json.loads(vec)))
        if dist < seuil: return {"utilisateur_id": uid, "distance": round(float(dist), 4)}, 200
    return {"error": "Aucune correspondance"}, 404