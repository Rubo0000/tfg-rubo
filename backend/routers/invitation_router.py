from fastapi import APIRouter, HTTPException, Request
from database.db import database
from models.project_invitation import ProjectInvitation
from models.project_user import ProjectUser
from models.project import Project
from models.user import User
from sqlalchemy import insert, select, update
from pydantic import BaseModel

router = APIRouter()

class InviteRequest(BaseModel):
    project_id: int
    invited_name: str
    invited_by: int

@router.post("/projects/invite")
async def invite_user(invite: InviteRequest):
    # Buscar usuario por nombre
    user_query = select(User).where(User.name == invite.invited_name)
    user = await database.fetch_one(user_query)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    # Comprobar si ya hay invitación
    check_inv = select(ProjectInvitation).where(
        (ProjectInvitation.project_id == invite.project_id) &
        (ProjectInvitation.invited_user_id == user.id) &
        (ProjectInvitation.status == "pending")
    )
    exists = await database.fetch_one(check_inv)
    if exists:
        raise HTTPException(status_code=400, detail="Ya existe una invitación pendiente.")

    # Crear invitación
    query = insert(ProjectInvitation).values(
        project_id=invite.project_id,
        invited_user_id=user.id,
        invited_by_user_id=invite.invited_by,
        status="pending"
    )
    await database.execute(query)
    return {"message": "Invitación enviada correctamente."}

@router.get("/users/{user_id}/invitations")
async def get_invitations(user_id: int):
    query = select(ProjectInvitation).where(
        (ProjectInvitation.invited_user_id == user_id) &
        (ProjectInvitation.status == "pending")
    )
    return await database.fetch_all(query)


@router.post("/invitations/{invitation_id}/accept")
async def accept_invitation(invitation_id: int):
    inv = await database.fetch_one(select(ProjectInvitation).where(ProjectInvitation.id == invitation_id))
    if not inv:
        raise HTTPException(404, "Invitación no encontrada")
    await database.execute(
        insert(ProjectUser).values(
            project_id=inv["project_id"],
            user_id=inv["invited_user_id"]
        )
    )
    await database.execute(
        update(ProjectInvitation)
        .where(ProjectInvitation.id == invitation_id)
        .values(status="accepted")
    )
    return {"message": "Invitación aceptada"}

@router.post("/invitations/{invitation_id}/reject")
async def reject_invitation(invitation_id: int):
    await database.execute(
        update(ProjectInvitation)
        .where(ProjectInvitation.id == invitation_id)
        .values(status="rejected")
    )
    return {"message": "Invitación rechazada"}
