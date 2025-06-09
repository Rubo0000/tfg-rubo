from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from database.db import Base

class ProjectInvitation(Base):
    __tablename__ = "project_invitations"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    invited_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    invited_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="pending")  # 'pending', 'accepted', 'rejected'
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
