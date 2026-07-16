import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")

    JWT_SECRET = os.getenv("JWT_SECRET", "default_jwt_secret")

    MONGO_URI = os.getenv("MONGO_URI")

    DATABASE_NAME = os.getenv("DATABASE_NAME", "shopping_db")

    PORT = int(os.getenv("PORT", 5000))

    if not MONGO_URI:
        raise ValueError("MONGO_URI is not set in environment variables")