from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel
from services import presence_service
from services.auth_service import token_required, role_required

tag = Tag(name="Présences")
presence_bp = APIBlueprint("presences", __name__)

class PresenceBody(BaseModel):
    seance_id: int; etudiant_id: int

class RapportPath(BaseModel):
    seance_id: int

@presence_bp.post("/pointer", tags=[tag], summary="Pointer une présence")
@token_required
def pointer(body: PresenceBody):
    return presence_service.pointer(body.seance_id, body.etudiant_id)

@presence_bp.get("/<int:seance_id>", tags=[tag], summary="Rapport d'une séance")
@token_required
@role_required("professeur", "admin")
def rapport(path: RapportPath):
    return presence_service.rapport(path.seance_id)