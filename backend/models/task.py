from sqlalchemy import Column, Integer, String, ForeignKey, Date
from database.db import Base
from sqlalchemy import Enum as SQLAlchemyEnum
from enums import PriorityEnum, StatusEnum
from sqlalchemy.orm import relationship
from models.comment import Comment
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(Date, nullable=True)
    priority = Column(SQLAlchemyEnum(PriorityEnum), nullable=False, default=PriorityEnum.media)
    status = Column(SQLAlchemyEnum(StatusEnum), nullable=False, default=StatusEnum.pendiente)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    comments = relationship("Comment", back_populates="task", cascade="all, delete-orphan")
