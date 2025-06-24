# routers/statistics.py

from fastapi import APIRouter, HTTPException
from database.db import database
from models.project import Project
from models.task import Task # Asegúrate de que tu modelo Task esté correctamente definido e importable
from models.user import User # Asegúrate de que tu modelo User esté correctamente definido e importable
from models.project_user import ProjectUser # Importar para contar proyectos por usuario
from sqlalchemy import select, func

router = APIRouter()

@router.get("/global")
async def get_global_statistics():
    try:
        # Obtener todos los proyectos
        projects_query = select(Project)
        projects = await database.fetch_all(projects_query)

        # Obtener todas las tareas
        tasks_query = select(Task)
        tasks = await database.fetch_all(tasks_query)

        # Obtener todos los estudiantes (usuarios con rol "student")
        students_query = select(User).where(User.role == "student")
        students = await database.fetch_all(students_query)

        # Calcular estadísticas generales
        total_projects = len(projects)
        total_tasks = len(tasks)
        completed_tasks = len([t for t in tasks if t["status"] == "finalizada"])
        pending_tasks = total_tasks - completed_tasks
        total_students = len(students)

        # Calcular progreso y conteo de proyectos/tareas por estudiante
        student_progress_data = {}
        for student in students:
            # Contar proyectos del estudiante
            student_projects_query = select(Project).join(ProjectUser).where(ProjectUser.user_id == student["id"])
            student_projects = await database.fetch_all(student_projects_query)

            # Contar tareas asignadas al estudiante
            student_tasks_assigned_query = select(Task).where(Task.assigned_to == student["id"])
            student_tasks_assigned = await database.fetch_all(student_tasks_assigned_query)

            total_student_tasks = len(student_tasks_assigned)
            completed_student_tasks = len([t for t in student_tasks_assigned if t["status"] == "finalizada"])

            progress = 0
            if total_student_tasks > 0:
                progress = round((completed_student_tasks / total_student_tasks) * 100)

            student_progress_data[student["id"]] = {
                "name": student["name"],
                "projects": len(student_projects),
                "tasks": total_student_tasks,
                "progress": progress
            }

        # Calcular el progreso promedio general de los estudiantes
        avg_progress = 0
        if student_progress_data:
            total_progress_sum = sum([s["progress"] for s in student_progress_data.values()])
            avg_progress = round(total_progress_sum / len(student_progress_data))

        return {
            "total_projects": total_projects,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "total_students": total_students,
            "average_progress": avg_progress,
            "student_progress": student_progress_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener estadísticas globales: {str(e)}")
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