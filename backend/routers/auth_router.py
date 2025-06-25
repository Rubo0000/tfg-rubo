# routers/auth_router.py
from fastapi import APIRouter, HTTPException, Depends, Form
from sqlalchemy import select
from database.db import database
from models.user import User
from auth import verify_password, create_access_token

router = APIRouter()
from pydantic import BaseModel

class LoginInput(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(data: LoginInput):
    query = select(User).where(User.email == data.username)
    user = await database.fetch_one(query)
    
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    token = create_access_token(data={"sub": user.email})
    return {
            "access_token": token,
            "user_id":user.id,
            "role":user.role,
            "name":user.name,
            "email":user.email,
            "avatar": user.avatar   
        }

@router.post("/logout")
async def logout():
    # No hay lógica real si estás usando JWT sin blacklist
    return {"message": "Sesión cerrada con éxito"}
@router.get("/me")
async def get_current_user(user_id: int):
    query = select(User).where(User.id == user_id)
    user = await database.fetch_one(query)
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }