from pydantic import BaseModel
from datetime import datetime
class AttachmentOut(BaseModel):
    id: int
    filename: str
    filepath: str
    task_id: int
    uploaded_at: datetime

    class Config:
        orm_mode = True