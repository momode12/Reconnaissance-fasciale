from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel, EmailStr, Field
from typing import Literal
from services import auth_service
from services.auth_service import token_required, role_required

tag = Tag(name="Auth", description="Inscription, connexion et gestion des comptes")
auth_bp = APIBlueprint("auth", __name__)

JWT_SECURITY = [{"BearerAuth": []}]

class RegisterBody(BaseModel):
    nom:          str        = Field(..., example="Rakoto")
    prenom:       str        = Field(..., example="Jean")
    email:        EmailStr   = Field(..., example="@gmail.com")
    mot_de_passe: str        = Field(..., example="Secret@123")
    role:         Literal["etudiant", "professeur"]
    vecteur:      list[float]= Field(..., description="Vecteur facial 128 ou 512 dims")

class LoginBody(BaseModel):
    email:        EmailStr = Field(..., example="@gmail.com")
    mot_de_passe: str      = Field(..., example="Secret@123")

class StatusBody(BaseModel):
    utilisateur_id: int
    status:         Literal["actif", "inactif"]

class TokenResponse(BaseModel):
    token:   str
    role:    str
    user_id: int

class CreatedResponse(BaseModel):
    id:      int
    message: str

class ErrorResponse(BaseModel):
    erreur: str


@auth_bp.post("/register", tags=[tag], summary="Inscription + enregistrement visage",
    responses={"201": CreatedResponse, "400": ErrorResponse})   # ← directement la classe
def register(body: RegisterBody):
    return auth_service.register(
        body.nom, body.prenom, body.email,
        body.mot_de_passe, body.role, body.vecteur
    )

@auth_bp.post("/login", tags=[tag], summary="Connexion",
    responses={"200": TokenResponse, "401": ErrorResponse})
def login(body: LoginBody):
    return auth_service.login(body.email, body.mot_de_passe)

@auth_bp.patch("/status", tags=[tag], summary="Activer / désactiver un compte",
    security=JWT_SECURITY,
    responses={"200": CreatedResponse, "403": ErrorResponse})
@token_required
@role_required("admin")
def update_status(body: StatusBody):
    return auth_service.update_status(body.utilisateur_id, body.status)