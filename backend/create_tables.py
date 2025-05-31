from database.db import engine, Base
from models import user  # importa el archivo donde está tu modelo

print("📦 Creando tablas...")
Base.metadata.create_all(bind=engine)
print("✅ Tablas creadas correctamente.")
