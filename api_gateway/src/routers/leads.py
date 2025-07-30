from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Person, Contact

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def list_leads(db: Session = Depends(get_db)):
    people = db.query(Person).all()
    return [{"id": p.id, "name": p.full_name, "title": p.title} for p in people]
