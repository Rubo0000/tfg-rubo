from fastapi import APIRouter, HTTPException
from database.db import database
from models.user import User
from sqlalchemy import insert, select
from pydantic import BaseModel
from auth import hash_password

router = APIRouter()

class UserIn(BaseModel):
    name: str
    email: str
    password: str
    role: str = "student"


@router.post("/users")
async def create_user(user: UserIn):
    hashed_pwd = hash_password(user.password)  # 🔐 aquí se aplica bcrypt
    query = insert(User).values(
        name=user.name,
        email=user.email,
        password=hashed_pwd,
        role=user.role
    )
    print(hashed_pwd)
    try:
        await database.execute(query)
        return {"message": "Usuario creado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/users")
async def get_users():
    query = select(User)
    return await database.fetch_all(query)
@router.get("/users/{user_id}")
async def get_user(user_id: int):
    query = select(User).where(User.id == user_id)
    return await database.fetch_one(query)
    
