from typing import Any, List
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()

class Course(Base):
    __allow_unmapped__ = True
    arbitrary_types_allowed=True
    
    __tablename__ = "courses"
    
    course_id = Column(Integer, primary_key=True)
    title = Column(String,nullable=False)
    description =  Column(String,nullable=False)
    instructor =  Column(String,nullable=False)
    duration =  Column(String, nullable=False)
    price = Column(Float, nullable=False)
    
    enrolled = relationship("Enrollment", back_populates = "owner")
    enrollments = relationship("Enrollment", back_populates="owner")


class Enrollment(Base):
    __allow_unmapped__ = True
    arbitrary_types_allowed = True
    
    __tablename__ = "enrollments"

    course_id = Column(Integer, primary_key=True)
    
    studentName =  Column(String, nullable=False)
    enrollmentDate= Column(String, nullable=False)
    
    owner_id = Column(Integer, ForeignKey("courses.course_id"))
    owner = relationship("Course", back_populates="enrollments");
    enrolled: relationship('Course', backref = 'enrollments', lazy = True, cascade = "all, delete-orphan")

    