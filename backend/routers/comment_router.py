# routers/comments.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db

from models.comment import Comment
from schemas.comment import CommentCreate, CommentOut
from typing import List

router = APIRouter()

@router.get("/tasks/{task_id}/comments", response_model=List[CommentOut])
def get_comments(task_id: int, db: Session = Depends(get_db)):
    return db.query(Comment).filter(Comment.task_id == task_id).all()

@router.post("/tasks/{task_id}/comments", response_model=CommentOut)
def add_comment(task_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(**comment.dict(), task_id=task_id)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment
@router.delete("/comments/{comment_id}", response_model=CommentOut)
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return comment