from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel, EmailStr
from services import auth_service
from services.auth_service import token_required, role_required

tag = Tag(name="Auth")
auth_bp = APIBlueprint("auth", __name__)

class RegisterBody(BaseModel):
    nom: str; prenom: str; email: EmailStr; mot_de_passe: str
    role: str; vecteur: list[float]

class LoginBody(BaseModel):
    email: EmailStr; mot_de_passe: str

class StatusBody(BaseModel):
    utilisateur_id: int; status: str

@auth_bp.post("/register", tags=[tag], summary="Inscription + enregistrement visage")
def register(body: RegisterBody):
    return auth_service.register(body.nom, body.prenom, body.email,
                                 body.mot_de_passe, body.role, body.vecteur)

@auth_bp.post("/login", tags=[tag], summary="Connexion")
def login(body: LoginBody):
    return auth_service.login(body.email, body.mot_de_passe)

@auth_bp.patch("/status", tags=[tag], summary="Activer / désactiver un compte")
@token_required
@role_required("admin")
def update_status(body: StatusBody):
    return auth_service.update_status(body.utilisateur_id, body.status)