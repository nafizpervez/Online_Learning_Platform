#crud functionality

from sqlalchemy.orm import session
from app.models import models
from sqlalchemy import func
from app.schemas import schemas


# get course by id
def get_course_by_id(db: session, course_id: int):
    return db.query(models.Course).filter(models.Course.course_id == course_id).first()

# get id from course id
def get_id_from_course(db: session, course_id: int):
    course_id = db.query(func.max(models.Course.course_id)).filter(models.Course.course_id == course_id).scalar()
    return course_id

# get course by title
def get_course_by_title(db: session, title: str):
    return db.query(models.Course).filter(models.Course.title == title).first()


# get course by instructor
def get_course_by_instructor(db: session, instructor: str):
    return (
        db.query(models.Course).filter(models.Course.instructor == instructor).first()
    )


# get course by price
def get_course_by_price(db: session, price: float):
    return db.query(models.Course).filter(models.Course.price == price).first()


# get all the courses
def get_courses(db: session, skip: int = 0, limit: int = 100):
    return db.query(models.Course).offset(skip).limit(limit).all()


#create courses
def create_courses(db: session, course: schemas.CourseCreate):
    db_course = models.Course(
                            title = course.title,
                            description = course.description,
                            instructor = course.instructor,
                            duration = course.duration,
                            price = course.price
                            )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course



#enrollment Create
def create_enrollment(db: session, enrollment: schemas.EnrollmentCreate, course_id: int):
        db_course_id = db.query(func.max(models.Course.course_id)).filter(models.Course.course_id == course_id).scalar()
        db_enrollment = models.Enrollment(
                        studentName = enrollment.studentName,
                        enrollmentDate = enrollment.enrollmentDate,
                        course_id = db_course_id
                        )
        db.add(db_enrollment)
        db.commit()
        db.refresh(db_enrollment)
        return db_enrollment
    