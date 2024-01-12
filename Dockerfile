# Use an official Python runtime as a base image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /code

# Copy requirements.tx to the working directory
COPY ./requirements.txt /code/requirements.txt

# Install project dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application code
COPY ./app /code/app

# Start the production server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]