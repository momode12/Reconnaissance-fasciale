from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel, Field
from services import face_service
from services.auth_service import token_required

tag = Tag(name="Face", description="Empreinte et reconnaissance faciale")
face_bp = APIBlueprint("face", __name__)

JWT_SECURITY = [{"BearerAuth": []}]

class VecteurBody(BaseModel):
    utilisateur_id: int
    vecteur:        list[float] = Field(..., description="Vecteur facial")

class IdentifyBody(BaseModel):
    vecteur: list[float]

class MessageResponse(BaseModel):
    message: str

class IdentifyResponse(BaseModel):
    utilisateur_id: int
    score:          float
    reconnu:        bool


@face_bp.post("/enregistrer", tags=[tag], summary="Enregistrer une empreinte",
    security=JWT_SECURITY,
    responses={"200": MessageResponse})
@token_required
def enregistrer(body: VecteurBody):
    return face_service.enregistrer(body.utilisateur_id, body.vecteur)

@face_bp.post("/identifier", tags=[tag], summary="Identifier un visage",
    security=JWT_SECURITY,
    responses={"200": IdentifyResponse})
@token_required
def identifier(body: IdentifyBody):
    return face_service.identifier(body.vecteur)