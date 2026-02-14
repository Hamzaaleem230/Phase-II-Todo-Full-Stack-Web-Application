import os
from pathlib import Path
from dotenv import load_dotenv

# Ye line backend se 3 level upar ja kar root ki .env dhundti hai
env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")
# Spec ke mutabiq Better Auth ka secret use kar rahe hain
JWT_SECRET_KEY = os.getenv("BETTER_AUTH_SECRET") 
NEXT_PUBLIC_BACKEND_URL = os.getenv("NEXT_PUBLIC_BACKEND_URL")

# backend/app/core/config.py mein ye line add karein
print(f"DEBUG: Backend is using Secret: {os.getenv('BETTER_AUTH_SECRET')}")