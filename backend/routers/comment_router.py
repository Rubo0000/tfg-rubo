from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.comment import Comment
from models.user import User
from schemas.comment import CommentCreate, CommentOut
from typing import List

router = APIRouter()

@router.get("/tasks/{task_id}/comments", response_model=List[CommentOut])
def get_comments(task_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.task_id == task_id).all()
    result = []
    for comment in comments:
        author = db.query(User).filter(User.id == comment.author_id).first()
        result.append(CommentOut(
            id=comment.id,
            content=comment.content,
            created_at=comment.created_at,
            user_id=comment.author_id,
            author_name=author.name if author else "Desconocido",
            author_role=author.role if author else "Desconocido"
        ))
    return result

@router.post("/tasks/{task_id}/comments", response_model=CommentOut)
def add_comment(task_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(
        content=comment.content,
        task_id=task_id,
        author_id=comment.user_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    author = db.query(User).filter(User.id == new_comment.author_id).first()
    return CommentOut(
        id=new_comment.id,
        content=new_comment.content,
        created_at=new_comment.created_at,
        user_id=new_comment.author_id,
        author_name=author.name if author else "Desconocido",
        author_role=author.role if author else "Desconocido"
    )

@router.delete("/comments/{comment_id}", response_model=CommentOut)
def delete_comment(comment_id: int, user_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")
    if comment.author_id != user_id:
        raise HTTPException(status_code=403, detail="No autorizado para eliminar este comentario")
    db.delete(comment)
    db.commit()
    author = db.query(User).filter(User.id == comment.author_id).first()
    return CommentOut(
        id=comment.id,
        content=comment.content,
        created_at=comment.created_at,
        user_id=comment.author_id,
        author_name=author.name if author else "Desconocido"
    )
