from database.db import engine, Base
from models import user, project,task  # añade esto

print("📦 Creando tablas...")
Base.metadata.create_all(bind=engine)
print("✅ Tablas creadas correctamente.")
