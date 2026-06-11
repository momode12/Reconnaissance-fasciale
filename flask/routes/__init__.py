from .auth_routes import auth_bp
from .face_routes import face_bp
from .seance_routes import seance_bp
from .presence_routes import presence_bp

def create_routes(app):
    app.register_api(auth_bp,     url_prefix="/auth")
    app.register_api(face_bp,     url_prefix="/face")
    app.register_api(seance_bp,   url_prefix="/seances")
    app.register_api(presence_bp, url_prefix="/presences")