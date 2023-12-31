# Online_Learning_Platform_BE

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
