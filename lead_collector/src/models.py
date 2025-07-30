from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Person(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    title = Column(String)
    linkedin_url = Column(String)
    company_id = Column(Integer, ForeignKey("companies.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
