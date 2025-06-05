from fastapi import APIRouter, HTTPException
from database.db import database
from models.project import Project
from sqlalchemy import insert, select
from pydantic import BaseModel

router = APIRouter()

class ProjectIn(BaseModel):
    name: str
    description: str | None = None
    created_by: int  # ID del usuario que crea el proyecto

@router.post("/projects")
async def create_project(project: ProjectIn):
    query = insert(Project).values(
        name=project.name,
        description=project.description,
        created_by=project.created_by
    )
    try:
        await database.execute(query)
        return {"message": "Proyecto creado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/projects")
async def get_projects():
    query = select(Project)
    return await database.fetch_all(query)
@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    query = select(Project).where(Project.id == project_id)
    return await database.fetch_one(query)
@router.get("/projects/by_user/{user_id}")
async def get_projects_by_user(user_id: int):
    query = select(Project).where(Project.created_by == user_id)
    return await database.fetch_all(query)

