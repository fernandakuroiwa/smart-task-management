import pytest
from pydantic import ValidationError
from app.schemas import TaskCreate


def test_create_task_with_valid_data():
    task = TaskCreate(
        title="Learn Python",
        description="Study Python fundamentals",
        priority="High",
        dueDate="2026-11-07"
    )

    assert task.title == "Learn Python"
    assert task.description == "Study Python fundamentals"
    assert task.priority == "High"
    assert task.due_date == "2026-11-07"


def test_create_task_with_empty_title():
    with pytest.raises(ValidationError):
        TaskCreate(
            title="     ",
            description="Testing invalid title",
            priority="High",
            dueDate="2026-11-07"
        )

def test_create_task_with_invalid_date():
    with pytest.raises(ValidationError):
        TaskCreate(
            title="Learn Python",
            description="Testing invalid date",
            priority="High",
            dueDate="2026-99-99"
        )

def test_create_task_with_invalid_priority():
    with pytest.raises(ValidationError):
        TaskCreate(
            title="Learn Python",
            description="Testing invalid priority",
            priority="Urgent",
            dueDate="2026-11-07"
        )