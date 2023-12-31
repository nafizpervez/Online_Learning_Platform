import pytest
import json
from fastapi.testclient import TestClient
from app.models import models
from app.database.database import create_database_connection
from app.main import app, get_db

engine, session = create_database_connection(db_type='sqlite')

@pytest.fixture(scope="session", autouse=True)
def create_test_db():
    models.Base.metadata.create_all(bind=engine)
    yield #running all the test
    models.Base.metadata.drop_all(bind=engine) # cleaning the database

#override the main database to use test sqlite database
def override_get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()

#override app database dependency
app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

#testing create course api
def test_create_course():
    course_data = {
        "title": "Test_Course11",
        "description": "Test_Description11",
        "instructor": "Test_Instructor11", 
        "duration": 11, 
        "price": 11.11
        }
    response = client.post("/create_courses", data=json.dumps(course_data))
    assert response.status_code == 201
    assert response.json()["title"] == "Test_Course11"

#testing getting all courses api
def test_get_courses():
    # Test the get_courses endpoint
    response = client.get("/get_courses")
    assert response.status_code == 200
    assert len(response.json()) > 0

#testing getting course by Id api
def test_get_course_by_id():
    # Test the get_course_by_id endpoint
    response = client.get("/courses/1")
    assert response.status_code == 200
    assert response.json()["course_id"] == 1

#testing enrollment in course by Id api
def test_enroll_student_if_course_exists():
    # Assuming valid enrollment data
    enrollment_data = {
        "studentName": "John Doe",
        "enrollmentDate": "2023-01-01",
    }
    # Test the enrollment endpoint with an existing course_id
    response = client.post(f"/enroll_student?course_id=1", data=json.dumps(enrollment_data))
    # Assert that the response status code is 201 (Created)
    assert response.status_code == 201
    # Assert that the response JSON contains the expected keys
    assert "studentName" in response.json()
    assert "enrollmentDate" in response.json()
    assert "course_id" in response.json()

#testing getting filtered courses 
def test_filter_courses():
    # Test the filter_courses endpoint
    response = client.get("/filter_courses?instructor=Test_Instructor11&duration=11&price=11.11")
    assert response.status_code == 200
    assert len(response.json()) > 0

#view all enrollment
def test_view_all_enrollments():
    # Test the "/get_enrollments" endpoint
    response = client.get("/get_enrollments")
    assert response.status_code == 200
    enrollments = response.json()
    assert isinstance(enrollments, list)

#drop all enrollment
def test_drop_all_enrollments():
    # Test the "/drop_all_enrollments" endpoint
    response = client.post("/drop_all_enrollments")
    assert response.status_code == 200
    result = response.json()
    assert result == {"message": "All values dropped from the enrollments table"}

#drop all courses
def test_drop_all_courses():
    # Test the "/drop_all_courses" endpoint
    response = client.post("/drop_all_courses")
    assert response.status_code == 200
    result = response.json()
    assert result == {"message": "All values dropped from the courses table"}