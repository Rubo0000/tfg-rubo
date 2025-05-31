from fastapi import APIRouter, HTTPException
from database.db import database
from models.task import Task
from sqlalchemy import insert, select, update, delete
from pydantic import BaseModel
from datetime import date
from enums import PriorityEnum, StatusEnum

router = APIRouter()

class TaskIn(BaseModel):
    title: str
    description: str | None = None
    due_date: date | None = None
    priority: PriorityEnum = PriorityEnum.media
    status: StatusEnum = StatusEnum.pendiente
    project_id: int
    assigned_to: int | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    due_date: date | None = None
    priority: PriorityEnum | None = None
    status: StatusEnum | None = None
    project_id: int | None = None
    assigned_to: int | None = None

@router.post("/tasks")
async def create_task(task: TaskIn):
    query = insert(Task).values(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        priority=task.priority,
        status=task.status,
        project_id=task.project_id,
        assigned_to=task.assigned_to
    )
    try:
        await database.execute(query)
        return {"message": "Tarea creada con éxito"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/tasks")
async def get_tasks():
    query = select(Task)
    return await database.fetch_all(query)
@router.get("/tasks/{task_id}")
async def get_task(task_id: int):
    query = select(Task).where(Task.id == task_id)
    return await database.fetch_one(query)
@router.get("/tasks/by_project/{project_id}")
async def get_tasks_by_project(project_id: int):
    query = select(Task).where(Task.project_id == project_id)
    return await database.fetch_all(query)
@router.get("/tasks/by_user/{user_id}")
async def get_tasks_by_user(user_id: int):
    query = select(Task).where(Task.assigned_to == user_id)
    return await database.fetch_all(query)

@router.put("/tasks/{task_id}")
async def update_task(task_id: int, updated_task: TaskUpdate):
    # Primero comprobamos si la tarea existe
    check_query = select(Task).where(Task.id == task_id)
    task = await database.fetch_one(check_query)

    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    # Si existe, actualizamos solo los campos no nulos
    update_query = (
        update(Task)
        .where(Task.id == task_id)
        .values(**{k: v for k, v in updated_task.dict().items() if v is not None})
    )

    await database.execute(update_query)
    return {"message": f"Tarea {task_id} actualizada correctamente"}


@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    check_query = select(Task).where(Task.id == task_id)
    task = await database.fetch_one(check_query)

    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    delete_query = delete(Task).where(Task.id == task_id)
    await database.execute(delete_query)

    return {"message": f"Tarea con id:{task_id} eliminada correctamente"}


