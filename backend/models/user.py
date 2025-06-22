from sqlalchemy import Column, Integer, String
from database.db import Base
from pydantic import BaseModel
from typing import Optional

class UserUpdate(BaseModel):
    name: Optional[str]
    password: Optional[str]
    avatar: Optional[str]

    class Config:
        extra = "forbid"
        orm_mode = True

class UserIn(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "student"
    avatar: Optional[str] = None  

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="student", nullable=False)
    avatar = Column(String, default="default_avatar.png", nullable=False)