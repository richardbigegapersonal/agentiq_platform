from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Person, Contact
from auth import verify_clerk_token  # <--- Make sure path is correct

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


# 🔒 Protected Route to Get Only Leads Belonging to Current User
@router.get("/api/my-leads")
def get_my_leads(request: Request, db: Session = Depends(get_db), payload=Depends(verify_clerk_token)):
    user_id = payload.get("sub")  # Clerk User ID from JWT

    # 💡 Customize based on your schema; assuming `Person.owner_id` maps to user ID
    user_leads = db.query(Person).filter(Person.owner_id == user_id).all()

    return [
        {"id": lead.id, "name": lead.full_name, "title": lead.title}
        for lead in user_leads
    ]
