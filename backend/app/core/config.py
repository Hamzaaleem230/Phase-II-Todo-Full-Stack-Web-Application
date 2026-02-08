import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
NEXT_PUBLIC_BACKEND_URL = os.getenv("NEXT_PUBLIC_BACKEND_URL")
