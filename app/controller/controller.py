# crud functionality
from fastapi import HTTPException, Query, Depends
from sqlalchemy.orm import session
from app.models import models
from sqlalchemy import func, delete
from app.schemas import schemas


# get course by id
def get_course_by_id(db: session, course_id: int):
    return db.query(models.Course).filter(models.Course.course_id == course_id).first()

# get course by title
def get_course_by_title(db: session, title: str):
    return db.query(models.Course).filter(models.Course.title == title).first()

# get all the courses
def get_courses(db: session, skip: int = 0, limit: int = 100):
    return db.query(models.Course).offset(skip).limit(limit).all()

# create courses
def create_courses(db: session, course: schemas.CourseCreate):
    db_course = models.Course(
        title=course.title,
        description=course.description,
        instructor=course.instructor,
        duration=course.duration,
        price=course.price,  
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

# drop all values from the courses table
def drop_all_courses(db: session):
    db.execute(delete(models.Course))
    db.commit()

# get all the enrollment
def get_enrollments(db: session, skip: int = 0, limit: int = 100):
    return db.query(models.Enrollment).offset(skip).limit(limit).all()

# get id from course id
def get_id_from_course(db: session, course_id: int):
    course_id = db.query(func.max(models.Course.course_id)).filter(models.Course.course_id == course_id).scalar()
    return course_id

# enrollment Create
def create_enrollment(db: session, enrollment: schemas.EnrollmentCreate, course_id: int):
    db_course_id = db.query(func.max(models.Course.course_id)).filter(
        models.Course.course_id == course_id).scalar()
    db_enrollment = models.Enrollment(
        studentName=enrollment.studentName,
        enrollmentDate=enrollment.enrollmentDate,
        course_id=db_course_id,
        owner_id=course_id
    )
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


# drop all values from the courses table
def drop_all_enrollments(db: session):
    db.execute(delete(models.Enrollment))
    db.commit()


#Validate filter_courses
def validate_instructor(instructor: str = Query(None, title="Instructor")):
    if instructor is int :
        raise HTTPException(status_code=400, detail="Instructor must be a Name")
    if instructor is float :
        raise HTTPException(status_code=400, detail="Instructor must be a Name")
    if instructor and not isinstance(instructor, str):
        raise HTTPException(status_code=400, detail="Instructor must be a Name")
    return instructor

def validate_duration(duration: int = Query(None, title="Duration")):
    if duration is not None and not isinstance(duration, int):
        raise HTTPException(status_code=400, detail="Duration must be an Number of Minutes")
    return duration

def validate_price(price: float = Query(None, title="Price")):
    if price is not None and not isinstance(price, (float)):
        raise HTTPException(status_code=400, detail="Price must be a float")
    if price is not None and price < 0.0:
        raise HTTPException(status_code=400, detail="Price must be a non-negative float")
    return price


#filter_courses
def get_filtered_courses(db: session, 
                        instructor: str = Depends(validate_instructor), 
                        duration: int = Depends(validate_duration), 
                        price: float = Depends(validate_price)
                        )-> list[models.Course]:    
    db_filter_course = db.query(models.Course)
    if instructor : 
        db_filter_course = db_filter_course.filter(models.Course.instructor == instructor)
    if duration: 
        db_filter_course = db_filter_course.filter(models.Course.duration == duration)        
    if price:
         db_filter_course = db_filter_course.filter(models.Course.price == price)
    filtered_courses = db_filter_course.all()
    if not filtered_courses:
        raise HTTPException(status_code=404, detail="No courses found with the specified criteria")
    return filtered_courses

