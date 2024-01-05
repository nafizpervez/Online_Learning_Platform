# 
FROM python:3.12
# 
WORKDIR /code
# 
COPY ./requirements.txt /code/requirements.txt
#
# RUN echo "Cython<3" > cython_constraint.txt
# #
# RUN PIP_CONSTRAINT=cython_constraint.txt pip install "ai-core-sdk[aicore-content]"
#
RUN pip install --upgrade pip
# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
# 
COPY ./app /code/app
# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]