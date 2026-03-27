from flask_openapi3 import OpenAPI, Info
from flask_cors import CORS
from config import Config
from database import init_db
from routes import create_routes

app = OpenAPI(__name__, info=Info(title="FASCIALE API", version="1.0.0"))
app.config.from_object(Config)
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True,
}})

init_db()
create_routes(app)

@app.route("/")
def index():
    return {"message": "FASCIALE API is running"}, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)