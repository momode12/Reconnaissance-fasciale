# Fasciale

Application web full-stack avec authentification JWT développée avec Flask pour le backend et React pour le frontend.

## Fonctionnalités

* Authentification utilisateur (Register/Login)
* Gestion des statuts utilisateur
* API REST avec Flask
* Documentation Swagger/OpenAPI
* JWT Authentication
* Backend structuré et modulaire
* Frontend React moderne

---

# Technologies utilisées

## Backend

* Python
* Flask
* Flask-JWT-Extended / PyJWT
* SQLAlchemy
* Swagger / OpenAPI
* SQLite / PostgreSQL (selon configuration)

## Frontend

* React
* TypeScript
* Axios
* Tailwind CSS

---

# Structure du projet

```bash
Fasciale/
│
├── flask/                 # Backend Flask
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── venv/
│   ├── .env
│   ├── requirements.txt
│   └── run.py
│
├── frontend/              # Frontend React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# Installation

## 1. Cloner le projet

```bash
git clone <repo_url>
cd Fasciale
```

---

# Backend Flask

## 2. Aller dans le backend

```bash
cd flask
```

## 3. Créer l'environnement virtuel

```bash
python -m venv venv
```

## 4. Activer le venv

### Windows

```bash
.\venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

## 5. Installer les dépendances

```bash
pip install -r requirements.txt
```

## 6. Configurer le fichier .env

Créer un fichier `.env` :

```env
JWT_SECRET_KEY=your_super_secret_key_here
FLASK_APP=run.py
FLASK_ENV=development
```

## 7. Lancer le serveur Flask

```bash
flask run --host=0.0.0.0 --port=5000
```

Le backend sera accessible sur :

```text
http://127.0.0.1:5000
```

Swagger :

```text
http://127.0.0.1:5000/openapi/swagger
```

---

# Frontend React

## 1. Aller dans le frontend

```bash
cd frontend
```

## 2. Installer les dépendances

```bash
npm install
```

## 3. Lancer le frontend

```bash
npm run dev
```

Le frontend sera accessible sur :

```text
http://localhost:5173
```

---

# Endpoints API

## Auth

| Méthode | Endpoint       | Description           |
| ------- | -------------- | --------------------- |
| POST    | /auth/register | Inscription           |
| POST    | /auth/login    | Connexion             |
| PATCH   | /auth/status   | Mise à jour du statut |

---

# Sécurité

* Authentification JWT
* Variables sensibles dans `.env`
* `.env` ignoré via `.gitignore`
* Middleware de protection des routes

---

# Git Ignore recommandé

```gitignore
.env
venv/
__pycache__/
*.pyc
node_modules/
dist/
```

---

# Commandes Git utiles

## Retirer `.env` du suivi Git

```bash
git rm --cached .env
```

## Vérifier les branches

```bash
git branch
```

## Push vers GitHub

```bash
git push origin master
```

---

# Auteur

HERITIANA Julien

Étudiant à l'École Nationale d'Informatique (ENI)
Parcours Gouvernance et Ingénierie des Données
