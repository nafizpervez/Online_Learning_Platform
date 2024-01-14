# Use an official Python runtime as a base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

#view path directory
RUN echo "PYTHONPATH=$PYTHONPATH"


#copy app directory into docker-image
COPY ./app /app

# Copy requirements.tx to the working directory
COPY ./requirements.txt /app

# Install project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Start the production server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]