from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel
from services import face_service
from services.auth_service import token_required

tag = Tag(name="Face")
face_bp = APIBlueprint("face", __name__)

class VecteurBody(BaseModel):
    utilisateur_id: int; vecteur: list[float]

class IdentifyBody(BaseModel):
    vecteur: list[float]

@face_bp.post("/enregistrer", tags=[tag], summary="Enregistrer empreinte faciale")
@token_required
def enregistrer(body: VecteurBody):
    return face_service.enregistrer(body.utilisateur_id, body.vecteur)

@face_bp.post("/identifier", tags=[tag], summary="Identifier un visage")
@token_required
def identifier(body: IdentifyBody):
    return face_service.identifier(body.vecteur)