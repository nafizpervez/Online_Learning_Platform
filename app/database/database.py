from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///database.db"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
# )


engine = create_engine('postgresql+psycopg2://postgres:4321@127.0.0.1/online_learning_db')

SessionLocal = sessionmaker(autocommit=False, bind=engine)

