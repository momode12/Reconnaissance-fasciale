from flask_openapi3 import OpenAPI, Info
from flask_cors import CORS
from config import Config
from database import init_db
from routes import create_routes

info = Info(
    title="FASCIALE API",
    version="1.0.0",
    description="""
## API Gestion de Présence par Reconnaissance Faciale
""")

security_schemes = {
    "BearerAuth": {
        "type":         "http",
        "scheme":       "bearer",
        "bearerFormat": "JWT"
    }
}

app = OpenAPI(
    __name__,
    info             = info,
    security_schemes = security_schemes,
)

app.config.from_object(Config)

CORS(app, resources={r"/*": {
    "origins":              "*",
    "methods":              ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    "allow_headers":        ["Content-Type","Authorization"],
    "supports_credentials": True,
}})

init_db()
create_routes(app)

@app.get("/")
def index():
    """Health check — vérifie que l'API tourne."""
    return {"message": "FASCIALE API is running", "version": "1.0.0"}, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)