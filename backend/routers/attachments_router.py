# routers/attachments.py
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from models.attachment import Attachment, AttachmentOut
from schemas.attachment import AttachmentOut
from database.db import get_db
import shutil
import os

router = APIRouter()

UPLOAD_DIRECTORY = "./uploads"

@router.post("/tasks/{task_id}/attachments", response_model=AttachmentOut)
def upload_attachment(task_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    attachment = Attachment(
        filename=file.filename,
        filepath=file_location,
        task_id=task_id
    )
    db.add(attachment)
    db.commit()
    db.refresh(attachment)
    return attachment

@router.get("/tasks/{task_id}/attachments", response_model=list[AttachmentOut])
def get_attachments(task_id: int, db: Session = Depends(get_db)):
    return db.query(Attachment).filter(Attachment.task_id == task_id).all()
