from fastapi import FastAPI, HTTPException, Query, Depends, FastAPI, HTTPException
from app.models import models
from app.schemas import schemas
from app.controller import controller
from app.database.database import  create_database_connection

engine, session = create_database_connection(db_type='postgresql')

def get_db():
    models.Base.metadata.create_all(bind=engine)
    db = session()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

# insert new courses into db and getting course by title
@app.post("/create_courses", response_model=schemas.Course, status_code=201)
def create_new_course(course: schemas.CourseCreate, db: session = Depends(get_db)):
    db_course = controller.get_course_by_title(db, title=course.title)
    if db_course:
        raise HTTPException(status_code=400, detail="Course Alredy Exists.")
    return controller.create_courses(db=db, course=course)

# show all the courses
@app.get("/get_courses", response_model=list[schemas.Course], description="Show All Courses")
def view_all_courses(skip: int = 0, limit: int = 100, db: session = Depends(get_db)):
    courses = controller.get_courses(db, skip=skip, limit=limit)
    if courses is None:
        raise HTTPException(status_code=404, detail="No Courses Found")
    return courses


# show course by Id
@app.get("/courses/{id}", response_model=schemas.Course, description="Show All Courses by ID")
def view_course_by_ID(id: int, db: session = Depends(get_db)):
    db_course = controller.get_course_by_id(db, course_id=id)
    if db_course is None:
        raise HTTPException(status_code=404, detail="Course Not Found")
    return db_course


# enrolling in the course
@app.post("/enroll_student", response_model=schemas.Enrollment, status_code=201)
def create_enrollment_for_course(enrollment: schemas.EnrollmentCreate, 
                                 course_id: int , 
                                 db: session = Depends(get_db)):
    db_course_id = controller.get_id_from_course(db, course_id=course_id)
    if (db_course_id == course_id):
        db_enrollment = controller.create_enrollment(
            db=db, enrollment=enrollment, course_id=db_course_id)
        return db_enrollment
    else:
        raise HTTPException(status_code=404, detail="Course Not Found")
    

# show filtered courses
@app.get("/filter_courses", response_model=list[schemas.Course], description="Show All Filtered Courses")
def read_filtered_courses(
                        db: session = Depends(get_db), 
                        instructor: str = Query(None, title="Instructor", max_length=100, min_length=3) and Depends(controller.validate_instructor), 
                        duration: int = Query(None, title="Duration" , max_length=3, min_length = 2) and Depends(controller.validate_duration),
                        price: float = Query(None, title="Price", max_length=11, min_length = 4) and Depends(controller.validate_price)
                        ):
            courses = controller.get_filtered_courses(db, instructor, duration, price)
            return courses

#show all enrollments
@app.get("/get_enrollments", response_model=list[schemas.Enrollment], description="Show All Enrollments")
def view_all_enrollments(skip: int = 0, limit: int = 100, db: session = Depends(get_db)):
    enrollmets = controller.get_enrollments(db, skip=skip, limit=limit)
    if enrollmets is None:
        raise HTTPException(status_code=404, detail="No Courses Found")
    return enrollmets

#drop all the Enrollments
@app.post("/drop_all_enrollments")
def drop_all_enrollments(db: session = Depends(get_db)):
    controller.drop_all_enrollments(db)
    return {"message": "All values dropped from the enrollments table"}

#drop all the courses
@app.post("/drop_all_courses")
def drop_all_courses(db: session = Depends(get_db)):
    controller.drop_all_courses(db)
    return {"message": "All values dropped from the courses table"}
