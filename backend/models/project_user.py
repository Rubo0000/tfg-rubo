from sqlalchemy import Table, Column, Integer, ForeignKey
from database.db import Base

class ProjectUser(Base):
    __tablename__ = "project_users"

    project_id = Column(Integer, ForeignKey("projects.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    role = Column(Integer, nullable=False) 