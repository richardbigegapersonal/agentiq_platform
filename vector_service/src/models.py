from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    domain = Column(String)
    industry = Column(String)

class Location(Base):
    __tablename__ = 'locations'
    id = Column(Integer, primary_key=True)
    city = Column(String)
    state = Column(String)
    country = Column(String)

class Person(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    title = Column(String)
    linkedin_url = Column(String)
    company_id = Column(Integer, ForeignKey("companies.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))

class Contact(Base):
    __tablename__ = 'contacts'
    id = Column(Integer, primary_key=True)
    person_id = Column(Integer, ForeignKey("people.id"))
    email = Column(String)
    phone = Column(String)
