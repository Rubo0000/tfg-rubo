from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    content: str
    user_id: int

class CommentOut(BaseModel):
    id: int
    content: str
    created_at: datetime
    user_id: int
    author_name: str

    class Config:
        orm_mode = True
