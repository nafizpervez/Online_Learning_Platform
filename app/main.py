from fastapi import FastAPI
from typing import Any, List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import session
from app.models import models
from app.schemas import schemas
from app.controller import controller
from app.database.database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#dependency get db to insert data 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()


#insert new courses into db and getting course by title
@app.post ("/courses", response_model=schemas.Course, status_code=201)
def create_new_course(course: schemas.CourseCreate, db: session = Depends(get_db)):
    db_course = controller.get_course_by_title(db, title = course.title)
    if db_course:
        raise HTTPException(status_code=400, detail="Course Alredy Exists.")
    return controller.create_courses(db=db, course=course)

#show all the courses
@app.get ("/courses", response_model=list[schemas.Course], description="Show All Courses")
def view_all_courses(skip: int=0, limit: int=100, db: session = Depends(get_db)):
    courses = controller.get_courses(db, skip=skip, limit=limit)
    return courses


#show course by Id
@app.get ("/courses/{id}", response_model=schemas.Course)
def view_course_by_ID(id: int, db: session = Depends(get_db)):
    db_course = controller.get_course_by_id(db, course_id=id)
    if db_course is None:
        raise HTTPException(status_code=404, detail="Course Not Found")
    return db_course



# enrolling in the course
@app.post ("/enrollment", response_model=schemas.Enrollment, status_code=201)
def create_enrollment_for_course(enrollment: schemas.EnrollmentCreate, course_id : int, db: session = Depends(get_db)):
    
    db_course_id = controller.get_id_from_course(db, course_id=course_id)
    
    if (db_course_id == course_id):
        db_enrollment = controller.create_enrollment(db=db, enrollment=enrollment, course_id=db_course_id)
        return db_enrollment
        
    else:
        raise HTTPException(status_code=404, detail="Course Not Found")
        
        


@app.put("/")
async def put():
    return {"messager": "This is Put API Route"}


# get all the courses
# @app.get("/Courses_Model", description = "Get All the Courses" )
# async def get_all_courses(title: str):
#     return Course.get(title)

# #get courses by ID
# @app.get("/Courses_Model/{title}", description = "Get All the Courses" )
# async def get_all_courses(title: str):
#     return Course.get(title)

#filter course
# class courseFilter(Filter):
#     order_by: Optional[list[str]]

# get the filtered courses
# @app.get("/users", response_model=list[UserOut])
# async def get_users(
#     user_filter: UserFilter = FilterDepends(UserFilter),
#     db: AsyncSession = Depends(get_db),
# ) -> Any:
#     query = select(Course)
#     query = user_filter.sort(query)
#     result = await db.execute(query)
#     return result.scalars().all()

#create new courses
@app.put("/Courses_Model")
async def create_new_course():
    return {"messager": "This is Put API Route"}
