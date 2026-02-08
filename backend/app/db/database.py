from sqlmodel import create_engine, Session
from app.core.config import DATABASE_URL

engine = create_engine(str(DATABASE_URL), echo=True)

def create_db_and_tables():
    # Alembic handle karega
    pass

def get_session():
    return Session(engine)
