import os
from database import SessionLocal
from models import Person, Company, Contact
from vector_utils import embed_text, init_pinecone

def index_leads():
    session = SessionLocal()
    leads = session.query(Person).limit(10).all()

    pinecone_index = init_pinecone()

    for lead in leads:
        company = session.query(Company).get(lead.company_id)
        contact = session.query(Contact).filter(Contact.person_id == lead.id).first()
        if not company or not contact:
            continue

        text = f"{lead.full_name} is a {lead.title} at {company.name}. Pain points likely relate to {company.industry} challenges."
        vector = embed_text(text)

        pinecone_index.upsert([
            (str(lead.id), vector, {"name": lead.full_name, "title": lead.title, "company": company.name})
        ])

    session.close()
