from models import create_seance, get_all_seances

def creer(professeur_id, matiere, date_seance, heure_debut, heure_fin, salle=None):
    sid = create_seance(professeur_id, matiere, date_seance, heure_debut, heure_fin, salle)
    return {"id": sid, "message": "Séance créée"}, 201

def lister():
    cols = ["id","professeur_id","matiere","date_seance","heure_debut","heure_fin","salle","created_at"]
    return [dict(zip(cols, [str(v) for v in r])) for r in get_all_seances()], 200