# user.py

from fastapi import APIRouter, HTTPException, Depends
from database.db import database
from models.user import User, UserIn, UserUpdate
from sqlalchemy import insert, select, update
from auth import hash_password, get_current_user_id

router = APIRouter()

@router.post("/users")
async def create_user(user: UserIn):
    hashed_pwd = hash_password(user.password)

    query = insert(User).values(
        name=user.name,
        email=user.email,
        password=hashed_pwd,
        role=user.role,
        avatar=user.avatar or "default_avatar.png"
    )

    try:
        await database.execute(query)
        return {"message": "Usuario creado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users")
async def get_users():
    query = select(User)
    return await database.fetch_all(query)

@router.get("/users/me")
async def get_current_user(user_id: int = Depends(get_current_user_id)):
    query = select(User).where(User.id == user_id)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "avatar": user["avatar"],
        "joinDate": user["join_date"],
    }

@router.get("/users/students")
async def get_students():
    query = select(User).where(User.role == "student")
    return await database.fetch_all(query)
# ---------------------------------------------------------------------

@router.get("/users/{user_id}")
async def get_user(user_id: int):
    query = select(User).where(User.id == user_id)
    return await database.fetch_one(query)

@router.put("/users/{user_id}")
async def update_user(user_id: int, user: UserUpdate):
    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    if not update_data:
        raise HTTPException(status_code=400, detail="No hay campos válidos para actualizar.")

    query = update(User).where(User.id == user_id).values(**update_data)

    try:
        await database.execute(query)
        return {"message": "Usuario actualizado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))