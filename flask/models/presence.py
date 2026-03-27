from database import get_connection

def marquer_presence(seance_id, etudiant_id, entree, statut="present"):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("""INSERT INTO presences (seance_id,etudiant_id,pointage_entree,statut)
                   VALUES (%s,%s,%s,%s) ON CONFLICT (seance_id,etudiant_id)
                   DO UPDATE SET pointage_entree=EXCLUDED.pointage_entree, statut=EXCLUDED.statut""",
                (seance_id, etudiant_id, entree, statut))
    conn.commit(); cur.close(); conn.close()

def get_by_seance(seance_id):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("SELECT * FROM presences WHERE seance_id=%s", (seance_id,))
    rows = cur.fetchall(); cur.close(); conn.close(); return rows