from fastapi import FastAPI
from database.db import database
from routers import user_router, project_router

app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(user_router.router)
app.include_router(project_router.router)

@app.get("/")
def read_root():
    return {"message": "¡Backend funcionando con DB!"}
