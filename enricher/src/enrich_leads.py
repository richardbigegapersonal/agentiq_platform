from database import SessionLocal
from models import Person, Company, Contact
from email_enricher import enrich_email
from pain_inferer import infer_pain_points

def enrich_all():
    session = SessionLocal()
    leads = session.query(Person).outerjoin(Contact).filter(Contact.email == None).limit(5).all()

    for lead in leads:
        company = session.query(Company).get(lead.company_id)
        if not company:
            continue

        email = enrich_email(lead.full_name, company.domain)
        pain_points = infer_pain_points(lead.title, company.industry)

        if email:
            contact = Contact(person_id=lead.id, email=email)
            session.add(contact)

        print(f"Lead: {lead.full_name}, Email: {email}, Pain: {pain_points}")

        session.commit()

    session.close()
