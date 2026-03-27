from database import get_connection

def find_by_email(email):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("SELECT * FROM utilisateurs WHERE email=%s", (email,))
    row = cur.fetchone(); cur.close(); conn.close(); return row

def create_user(nom, prenom, email, pwd_hash, role):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("""INSERT INTO utilisateurs (nom,prenom,email,mot_de_passe,role)
                   VALUES (%s,%s,%s,%s,%s) RETURNING id""", (nom,prenom,email,pwd_hash,role))
    uid = cur.fetchone()[0]; conn.commit(); cur.close(); conn.close(); return uid

def update_status(uid, status):
    conn = get_connection(); cur = conn.cursor()
    cur.execute("UPDATE utilisateurs SET status=%s WHERE id=%s", (status, uid))
    conn.commit(); cur.close(); conn.close()