# routers/statistics.py

from fastapi import APIRouter, HTTPException
from database.db import database
from models.project import Project
from models.task import Task 
from models.user import User 
from models.project_user import ProjectUser
from sqlalchemy import select, func

router = APIRouter()

@router.get("/global")
async def get_global_statistics():
    try:
        # Obtener todos los proyectos y tareas
        projects = await database.fetch_all(select(Project))
        tasks = await database.fetch_all(select(Task))
        students = await database.fetch_all(select(User).where(User.role == "student"))

        # Calcular estadísticas generales
        total_projects = len(projects)
        total_tasks = len(tasks)
        completed_tasks = len([t for t in tasks if t["status"] == "finalizada"])
        pending_tasks = total_tasks - completed_tasks

        # Calcular progreso por estudiante (versión optimizada)
        student_progress = {}
        for student in students:
            # Consulta optimizada para proyectos del estudiante
            projects_query = """
            SELECT COUNT(*) as count 
            FROM project_users 
            WHERE user_id = :user_id
            """
            projects_count = await database.fetch_one(projects_query, {"user_id": student["id"]})

            # Consulta optimizada para tareas del estudiante
            tasks_query = """
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'finalizada' THEN 1 ELSE 0 END) as completed
            FROM tasks 
            WHERE assigned_to = :user_id
            """
            tasks_data = await database.fetch_one(tasks_query, {"user_id": student["id"]})

            progress = 0
            if tasks_data["total"] and tasks_data["total"] > 0:
                progress = round((tasks_data["completed"] / tasks_data["total"]) * 100)

            student_progress[student["id"]] = {
                "progress": progress,
                "projects": projects_count["count"] or 0,
                "completed_tasks": tasks_data["completed"] or 0,
                "pending_tasks": (tasks_data["total"] or 0) - (tasks_data["completed"] or 0)
            }

        return {
            "total_projects": total_projects,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "student_progress": student_progress
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener estadísticas: {str(e)}")

@router.get("/users/{user_id}/progress")
async def get_student_progress(user_id: int):
    try:
        # Verificar si el usuario existe y es estudiante
        user_query = select(User).where(User.id == user_id)
        user = await database.fetch_one(user_query)
        
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        if user["role"] != "student":
            raise HTTPException(status_code=400, detail="El usuario no es un estudiante")

        # Obtener proyectos del estudiante
        student_projects_query = (
            select(Project)
            .join(ProjectUser)
            .where(ProjectUser.user_id == user_id)
        )
        student_projects = await database.fetch_all(student_projects_query)

        # Obtener tareas asignadas al estudiante
        student_tasks_query = select(Task).where(Task.assigned_to == user_id)
        student_tasks = await database.fetch_all(student_tasks_query)

        # Calcular estadísticas
        total_projects = len(student_projects)
        total_tasks = len(student_tasks)
        completed_tasks = len([t for t in student_tasks if t["status"] == "finalizada"])
        progress = 0
        
        if total_tasks > 0:
            progress = round((completed_tasks / total_tasks) * 100)

        # Obtener detalles de proyectos con progreso
        projects_with_progress = []
        for project in student_projects:
            project_tasks_query = select(Task).where(Task.project_id == project["id"])
            project_tasks = await database.fetch_all(project_tasks_query)
            
            total_project_tasks = len(project_tasks)
            completed_project_tasks = len([t for t in project_tasks if t["status"] == "finalizada"])
            project_progress = 0
            
            if total_project_tasks > 0:
                project_progress = round((completed_project_tasks / total_project_tasks) * 100)
            
            projects_with_progress.append({
                "id": project["id"],
                "name": project["name"],
                "due_date": project["due_date"] if "due_date" in project else None,
                "total_tasks": total_project_tasks,
                "completed_tasks": completed_project_tasks,
                "progress": project_progress
            })

        return {
            "student_id": user_id,
            "student_name": user["name"],
            "overall_progress": progress,
            "total_projects": total_projects,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": total_tasks - completed_tasks,
            "projects": projects_with_progress,
            "tasks": student_tasks
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener el progreso del estudiante: {str(e)}")