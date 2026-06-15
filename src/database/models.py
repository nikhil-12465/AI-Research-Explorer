from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from src.database.database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(100),
        unique=True
    )

    email = Column(
        String(255),
        unique=True
    )

    password_hash = Column(
        String(255)
    )

class Document(Base):

    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer
    )

    paper_name = Column(
        String(255)
    )

class ActivityLog(Base):

    __tablename__ = "activity_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer
    )

    action = Column(
        String(255)
    )