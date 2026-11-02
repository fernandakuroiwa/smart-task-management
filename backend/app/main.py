
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Smart Task Management API",
    description="API for an intelligent task management system",
    version="1.0.0"
)

# Allow requests from our React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Smart Task Management API!"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running!"
    }
