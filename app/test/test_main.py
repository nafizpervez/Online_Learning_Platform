import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database.database import SessionLocal
from sqlalchemy.orm import session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///database.db"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
# )

# Create a TestClient instance for testing the FastAPI app
client = TestClient(app)

#importing the db into test_env
test_db = SessionLocal()

#Define a pytest fixture to set up the initial state of the database
@pytest.fixture
def setup_database():
    initial_data = [
        {
            "title": "Test Course66",
            "description": "Test Description66",
            "instructor": "Test Instructor66", 
            "duration": 660, 
            "price": 666.666,
            "course_id": 1
        },
        {
            "title": "Test Course77",
            "description": "Test Description7",
            "instructor": "Test Instructor7", 
            "duration": 770, 
            "price": 777.777,
            "course_id": 2
        },
    ]
    for data in initial_data:
        test_db.execute("INSERT INTO courses (title, description, instructor, price, course_id) VALUES (:title, :description, :instructor, :price, :course_id", data)
    # Return the test database session
    return test_db


#testing create course api
def test_create_course():
    course_data = {
        "title": "Test Course10",
        "description": "Test Description10",
        "instructor": "Test Instructor10", 
        "duration": 100, 
        "price": 100.1,
        "course_id": 10
        }
    response = client.post("/create_courses", json=course_data)
    assert response.status_code == 201
    assert response.json()["title"] == "Test Course10"


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
    response = client.post(f"/enroll_student?course_id=10", json=enrollment_data)
    # Assert that the response status code is 201 (Created)
    assert response.status_code == 201
    # Assert that the response JSON contains the expected keys
    assert "studentName" in response.json()
    assert "enrollmentDate" in response.json()
    assert "course_id" in response.json()
    

#testing getting filtered courses 
def test_filter_courses():
    # Test the filter_courses endpoint
    response = client.get("/filter_courses?instructor=string&duration=40&price=40.40")
    assert response.status_code == 200
    assert len(response.json()) > 0

# Close the test database session after testing
def finalizer():
    test_db.close()

# Register the finalizer to be called after all tests are run
def pytest_sessionfinish(test_db: session, exitstatus):
    if exitstatus == 0:
        print("All tests passed successfully!")
    else:
        print(f"Test session finished with exit status {exitstatus}.")
    finalizer()