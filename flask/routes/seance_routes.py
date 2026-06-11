from flask_openapi3 import APIBlueprint, Tag
from pydantic import BaseModel, Field
from datetime import date, time
from typing import Optional
from services import seance_service
from services.auth_service import token_required, role_required

tag = Tag(name="Séances", description="Gestion des cours")
seance_bp = APIBlueprint("seances", __name__)

JWT_SECURITY = [{"BearerAuth": []}]

class SeanceBody(BaseModel):
    professeur_id: int
    matiere:       str  = Field(..., example="Algorithmique")
    date_seance:   date = Field(..., example="2025-06-01")
    heure_debut:   time = Field(..., example="08:00:00")
    heure_fin:     time = Field(..., example="10:00:00")
    salle:         Optional[str] = None

class SeanceResponse(BaseModel):
    seance_id: int
    message:   str

class MessageResponse(BaseModel):
    message: str


@seance_bp.post("/", tags=[tag], summary="Créer une séance",
    security=JWT_SECURITY,
    responses={"201": SeanceResponse, "403": MessageResponse})
@token_required
@role_required("professeur", "admin")
def creer(body: SeanceBody):
    return seance_service.creer(
        body.professeur_id, body.matiere, body.date_seance,
        body.heure_debut, body.heure_fin, body.salle
    )

@seance_bp.get("/", tags=[tag], summary="Lister les séances",
    security=JWT_SECURITY,
    responses={"200": MessageResponse})
@token_required
def lister():
    return seance_service.lister()