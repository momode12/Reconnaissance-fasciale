from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel, Field
from typing import Optional, List
from services import presence_service
from services.auth_service import token_required, role_required

tag = Tag(name="Présences", description="Pointage et rapports de présence")
presence_bp = APIBlueprint("presences", __name__)

JWT_SECURITY = [{"BearerAuth": []}]

class PresenceBody(BaseModel):
    seance_id:   int
    etudiant_id: int

class RapportPath(BaseModel):
    seance_id: int

class PresenceItem(BaseModel):
    nom:    str
    prenom: str
    entree: Optional[str] = None
    sortie: Optional[str] = None
    statut: str

class MessageResponse(BaseModel):
    message: str


@presence_bp.post("/pointer", tags=[tag], summary="Pointer une présence",
    security=JWT_SECURITY,
    responses={"200": MessageResponse})
@token_required
def pointer(body: PresenceBody):
    return presence_service.pointer(body.seance_id, body.etudiant_id)

@presence_bp.get("/<int:seance_id>", tags=[tag], summary="Rapport d'une séance",
    security=JWT_SECURITY,
    responses={"200": PresenceItem})   # ← PresenceItem seul, pas List
@token_required
@role_required("professeur", "admin")
def rapport(path: RapportPath):
    return presence_service.rapport(path.seance_id)