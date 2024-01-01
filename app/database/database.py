from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

#database adapter to select multiple database, one for testing (sqlute) and one for the app (postgres)
def create_database_connection(db_type: str = 'postgresql'):
    match (db_type):
        case ('postgresql'):
            DATABASE_URL = 'postgresql+psycopg2://postgres:4321@host.docker.internal/online_learning_db'
        case ('sqlite'):
            DATABASE_URL = "sqlite:///./test/test_database/test_database.db"
        case (_):
            pass
        
    engine = create_engine(DATABASE_URL)
    session = sessionmaker(autocommit=False, bind=engine)
    return engine, session