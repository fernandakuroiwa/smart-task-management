from sqlalchemy import text
from app.database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version()"))

        version = result.scalar()

        print("Connection successful!")
        print(f"PostgreSQL version: {version}")

except Exception as error:
    print("Connection failed!")
    print(error)