# Online Learning Platform

A full-stack Online Learning Platform designed for publishing and managing online courses where students register, attend classes, and take scheduled tests, while teachers conduct and manage multiple courses. A structured scheduling system ensures students cannot join overlapping sessions, promoting disciplined learning.

The platform features a clean and intuitive Next.js frontend with a robust FastAPI backend, fully testable through Swagger UI and Postman. Database support includes both PostgreSQL and MySQL, with SQLAlchemy adapters enabling seamless switching between databases.

To ensure scalability and reliability, the entire system is containerized using Docker and Docker Compose, with CI/CD pipelines powered by GitHub Actions and Jenkins as an alternative. Database validation and monitoring are facilitated through pgAdmin (Postgres) and SQL readers (MySQL).

This project highlights expertise in modern web application development, combining scalable architecture, seamless DevOps integration, and user-focused design.

## Build Steps for the whole container (backend, postgres, pgadmin)

run docker container

```
docker compose up
```

## Build steps only the backend

build newer image command:

```
docker build -t  online_learning_image .
```

docker run command:

```
docker run -d --name demo_python -p 8000:8000 online_learning_image
```

remove older image command:

```
docker stop demo_python && docker rm demo_python
```

## run tests

```
pytest test/test_main.py
```

## run without docker

start postgreg database server in the cmd

```
pg_ctl start -D "C:\Program Files\PostgreSQL\16\data"
```

install dependencies

```
pip install --no-cache-dir --upgrade -r requirements.txt
```

run uvicorn

```
uvicorn app.main:app --reload
```
