import psycopg2
from config import Config
import bcrypt

def get_connection():
    return psycopg2.connect(
        host=Config.DB_HOST, port=Config.DB_PORT,
        dbname=Config.DB_NAME, user=Config.DB_USER,
        password=Config.DB_PASSWORD
    )
    
def seed_admin(cur):
    cur.execute("SELECT id FROM utilisateurs WHERE email='admin@gmail.com'")
    if cur.fetchone(): return
    h = bcrypt.hashpw("admin".encode(), bcrypt.gensalt()).decode()
    cur.execute("""INSERT INTO utilisateurs (nom,prenom,email,mot_de_passe,role,status)
                   VALUES ('Admin','System','admin@gmail.com',%s,'admin','actif')""", (h,))

def init_db():
    conn = get_connection(); cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS utilisateurs (
        id SERIAL PRIMARY KEY, 
        nom VARCHAR(100) NOT NULL, 
        prenom VARCHAR(100) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL, 
        mot_de_passe VARCHAR(255) NOT NULL,
        role VARCHAR(15) NOT NULL CHECK (role IN ('etudiant','professeur','admin')),
        status VARCHAR(8) DEFAULT 'inactif' CHECK (status IN ('actif','inactif')),
        created_at TIMESTAMP DEFAULT NOW())""")
    cur.execute("""CREATE TABLE IF NOT EXISTS empreintes_faciales (
        id SERIAL PRIMARY KEY, 
        utilisateur_id INT UNIQUE NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
        vecteur_facial TEXT NOT NULL, 
        created_at TIMESTAMP DEFAULT NOW())""")
    cur.execute("""CREATE TABLE IF NOT EXISTS seances (
        id SERIAL PRIMARY KEY, 
        professeur_id INT NOT NULL REFERENCES utilisateurs(id),
        matiere VARCHAR(15) NOT NULL, 
        date_seance DATE NOT NULL,
        heure_debut TIME NOT NULL, 
        heure_fin TIME NOT NULL,
        salle VARCHAR(15), 
        created_at TIMESTAMP DEFAULT NOW())""")
    cur.execute("""CREATE TABLE IF NOT EXISTS presences (
        id SERIAL PRIMARY KEY, seance_id INT NOT NULL REFERENCES seances(id) ON DELETE CASCADE,
        etudiant_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
        pointage_entree TIMESTAMP, 
        pointage_sortie TIMESTAMP,
        statut VARCHAR(20) DEFAULT 'absent' CHECK (statut IN ('present','absent')),
        UNIQUE (seance_id, etudiant_id))""")
    seed_admin(cur)
    conn.commit(); 
    cur.close(); 
    conn.close()
    print("Tables prêtes.")