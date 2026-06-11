from database import get_connection

def save_empreinte(user_id, vecteur):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("""INSERT INTO empreintes_faciales (utilisateur_id, vecteur_facial) VALUES (%s,%s)
                   ON CONFLICT (utilisateur_id) DO UPDATE SET vecteur_facial=EXCLUDED.vecteur_facial""",
                (user_id, vecteur))
    conn.commit(); cur.close(); conn.close()

def get_all_empreintes():
    conn = get_connection(); cur = conn.cursor()
    cur.execute("SELECT utilisateur_id, vecteur_facial FROM empreintes_faciales")
    rows = cur.fetchall(); cur.close(); conn.close(); return rows