from datetime import datetime
from models import marquer_presence, get_by_seance

def pointer(seance_id, etudiant_id):
    marquer_presence(seance_id, etudiant_id, datetime.now())
    return {"message": "Présence enregistrée"}, 200

def rapport(seance_id):
    cols = ["id","seance_id","etudiant_id","pointage_entree","pointage_sortie","statut"]
    return [dict(zip(cols, [str(v) for v in r])) for r in get_by_seance(seance_id)], 200