
import pytest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from app import models


@pytest.fixture
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )

    TestingSessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )

    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()

        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


# CREATE

def test_create_task(client):
    response = client.post(
        "/api/tasks/",
        json={
            "title": "Learn Pytest",
            "description": "Test API endpoints",
            "priority": "High",
            "dueDate": "2026-11-07"
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Learn Pytest"
    assert data["description"] == "Test API endpoints"
    assert data["priority"] == "High"
    assert data["dueDate"] == "2026-11-07"
    assert data["status"] == "Pending"


# READ

def test_get_tasks(client):
    client.post(
        "/api/tasks/",
        json={
            "title": "Learn Python",
            "description": "Study Python fundamentals",
            "priority": "Medium",
            "dueDate": "2026-11-07"
        }
    )

    response = client.get("/api/tasks/")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["title"] == "Learn Python"
    assert data[0]["priority"] == "Medium"


# UPDATE

def test_update_task(client):
    create_response = client.post(
        "/api/tasks/",
        json={
            "title": "Learn Python",
            "description": "Initial description",
            "priority": "Low",
            "dueDate": "2026-11-07"
        }
    )

    task_id = create_response.json()["id"]

    response = client.put(
        f"/api/tasks/{task_id}",
        json={
            "title": "Learn Advanced Python",
            "description": "Updated description",
            "priority": "High",
            "dueDate": "2026-11-15"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == task_id
    assert data["title"] == "Learn Advanced Python"
    assert data["description"] == "Updated description"
    assert data["priority"] == "High"
    assert data["dueDate"] == "2026-11-15"


def test_update_nonexistent_task(client):
    response = client.put(
        "/api/tasks/9999",
        json={
            "title": "Updated task",
            "description": "This task does not exist",
            "priority": "High",
            "dueDate": "2026-11-15"
        }
    )

    assert response.status_code == 404


# DELETE

def test_delete_task(client):
    create_response = client.post(
        "/api/tasks/",
        json={
            "title": "Task to delete",
            "description": "This task will be deleted",
            "priority": "Low",
            "dueDate": "2026-11-07"
        }
    )

    task_id = create_response.json()["id"]

    response = client.delete(
        f"/api/tasks/{task_id}"
    )

    assert response.status_code == 204

    get_response = client.get("/api/tasks/")

    assert get_response.status_code == 200
    assert len(get_response.json()) == 0


def test_delete_nonexistent_task(client):
    response = client.delete("/api/tasks/9999")

    assert response.status_code == 404


# UPDATE STATUS

def test_update_task_status(client):
    create_response = client.post(
        "/api/tasks/",
        json={
            "title": "Complete project",
            "description": "Finish the task management project",
            "priority": "High",
            "dueDate": "2026-11-15"
        }
    )

    task_id = create_response.json()["id"]

    response = client.patch(
        f"/api/tasks/{task_id}/status",
        json={
            "status": "Completed"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == task_id
    assert data["status"] == "Completed"


def test_update_status_with_invalid_value(client):
    create_response = client.post(
        "/api/tasks/",
        json={
            "title": "Test invalid status",
            "description": "Testing status validation",
            "priority": "Medium",
            "dueDate": "2026-11-15"
        }
    )

    task_id = create_response.json()["id"]

    response = client.patch(
        f"/api/tasks/{task_id}/status",
        json={
            "status": "Cancelled"
        }
    )

    assert response.status_code == 422


def test_update_status_of_nonexistent_task(client):
    response = client.patch(
        "/api/tasks/9999/status",
        json={
            "status": "Completed"
        }
    )

    assert response.status_code == 404
