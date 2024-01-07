from pydantic import BaseModel


class EnrollmentBase(BaseModel):
    studentName: str
    enrollmentDate: str
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class EnrollmentCreate(EnrollmentBase):
    studentName: str
    enrollmentDate: str
    course_id: int
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class Enrollment(EnrollmentBase):
    studentName: str
    enrollmentDate: str
    course_id: int
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: str
    instructor: str
    duration: float
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class CourseCreate(CourseBase):
    title: str
    description: str
    instructor: str
    duration: float
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class Course(CourseBase):
    course_id: int
    title: str
    description: str
    instructor: str
    duration: float
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True