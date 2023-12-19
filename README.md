# Online_Learning_Platform_BE

## Build steps

build newer image commnad:
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

