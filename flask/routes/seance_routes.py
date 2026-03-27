from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel
from datetime import date, time
from services import seance_service
from services.auth_service import token_required, role_required

tag = Tag(name="Séances")
seance_bp = APIBlueprint("seances", __name__)

class SeanceBody(BaseModel):
    professeur_id: int; matiere: str; date_seance: date
    heure_debut: time; heure_fin: time; salle: str | None = None

@seance_bp.post("/", tags=[tag], summary="Créer une séance")
@token_required
@role_required("professeur", "admin")
def creer(body: SeanceBody):
    return seance_service.creer(body.professeur_id, body.matiere, body.date_seance,
                                body.heure_debut, body.heure_fin, body.salle)

@seance_bp.get("/", tags=[tag], summary="Lister les séances")
@token_required
def lister():
    return seance_service.lister()