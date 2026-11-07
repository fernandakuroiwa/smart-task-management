from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import tasks

app = FastAPI(
    title="Smart Task Management API",
    description="API for managing tasks",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running!"
    }