# project.py

from fastapi import APIRouter, HTTPException, Path
from database.db import database
from models.project import Project
from models.project_user import ProjectUser
from models.user import User
from models.task import Task
from sqlalchemy import insert, select, delete, func
from pydantic import BaseModel # <--- AÑADE ESTA LÍNEA

router = APIRouter()

class ProjectIn(BaseModel):
    name: str
    description: str | None = None
    created_by: int

@router.post("/projects")
async def create_project(project: ProjectIn):
    query = insert(Project).values(
        name=project.name,
        description=project.description,
        created_by=project.created_by
    )
    try:
        project_id = await database.execute(query)

        await database.execute(
            insert(ProjectUser).values(
                project_id=project_id,
                user_id=project.created_by
            )
        )
        return {"message": "Proyecto creado con éxito", "project_id": project_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/projects/all")
async def get_all_projects():
    query = select(Project)
    return await database.fetch_all(query)

@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    query = select(Project).where(Project.id == project_id)
    return await database.fetch_one(query)

@router.get("/projects/by_user/{user_id}")
async def get_projects_by_user(user_id: int):
    query = (
        select(Project)
        .join(ProjectUser, Project.id == ProjectUser.project_id)
        .where(ProjectUser.user_id == user_id)
    )
    return await database.fetch_all(query)

@router.get("/projects/{project_id}/users")
async def get_project_users(project_id: int):
    join_query = (
        select(User)
        .join(ProjectUser, User.id == ProjectUser.user_id)
        .where(ProjectUser.project_id == project_id)
    )
    return await database.fetch_all(join_query)

@router.post("/projects/{project_id}/users/{user_id}")
async def add_user_to_project(
    project_id: int = Path(...),
    user_id: int = Path(...)
):
    query = insert(ProjectUser).values(
        project_id=project_id,
        user_id=user_id
    )
    try:
        await database.execute(query)
        return {"message": "Usuario añadido al proyecto"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/projects/{project_id}/users/{user_id}")
async def remove_user_from_project(project_id: int, user_id: int):
    query = delete(ProjectUser).where(
        ProjectUser.project_id == project_id,
        ProjectUser.user_id == user_id
    )
    try:
        await database.execute(query)
        return {"message": "Usuario eliminado del proyecto"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))