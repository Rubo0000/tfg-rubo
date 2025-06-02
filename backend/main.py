from fastapi import FastAPI
from database.db import database
from routers import user_router, project_router, task_router, auth_router, comment_router, attachments_router
from models import user, project, task  # Importa tus modelos aquí
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(user_router.router)
app.include_router(project_router.router)
app.include_router(task_router.router)
app.include_router(auth_router.router)  # ⬅️ nuevo router
app.include_router(comment_router.router)
app.include_router(attachments_router.router)


@app.get("/")
def read_root():
    return {"message": "¡Backend funcionando con DB!"}
