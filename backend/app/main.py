from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.auth import auth_router
from app.api.v1.tasks import tasks_router

app = FastAPI(title="Todo App API")

# Hardcoded origins for dev to avoid .env issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Sab allow kar diya
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo App API"}