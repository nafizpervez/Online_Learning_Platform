from typing import Any, List
from pydantic import BaseModel, ConfigDict


class EnrollmentBase(BaseModel):
    studentName: str
    enrollmentDate: str
    
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class EnrollmentCreate(EnrollmentBase):
    studentName: str
    enrollmentDate: str
    
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class Enrollment(EnrollmentBase):
    course_id: int
    

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class CourseBase(BaseModel):
    title: str
    description: str
    instructor: str
    duration: int
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class CourseCreate(CourseBase):
    title: str
    description: str
    instructor: str
    duration: int
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class Course(CourseBase):
    course_id: int
    title: str
    description: str
    instructor: str
    duration: int
    price: float
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True
        



# function for time in
def time_in_minutes(sec):
    sec = sec % (24 * 3600)
    hour = sec // 3600
    sec %= 3600
    min = sec // 60
    sec %= 60
    print("seconds value in hours:", hour)
    print("seconds value in minutes:", min)
    return "%02d:%02d" % (hour, min)


# adding dollar sign
# a =
# b =

# a_dollars = "${:.2f}".format(a)  # make strings with leading dollar sign
# b_dollars = "${:.2f}".format(b)

# a_padded = "foo:{:>8}".format(a_dollars)  # insert them into strings with padding
# b_padded = "foo:{:>8}".format(b_dollars)
