from database import get_connection

def create_seance(prof_id, matiere, date, h_debut, h_fin, salle):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("""INSERT INTO seances (professeur_id,matiere,date_seance,heure_debut,heure_fin,salle)
                   VALUES (%s,%s,%s,%s,%s,%s) RETURNING id""", (prof_id,matiere,date,h_debut,h_fin,salle))
    sid = cur.fetchone()[0]; conn.commit(); cur.close(); conn.close(); return sid

def get_all_seances():
    conn = get_connection(); cur = conn.cursor()
    cur.execute("SELECT * FROM seances ORDER BY date_seance DESC")
    rows = cur.fetchall(); cur.close(); conn.close(); return rows