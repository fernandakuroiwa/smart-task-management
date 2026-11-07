from fastapi import APIRouter, HTTPException, Response, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.database import get_db
from app import models
from app.schemas import TaskCreate, TaskResponse, TaskStatusUpdate

router = APIRouter(
    prefix="/api/tasks",
    tags=["Tasks"]
)

@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    statement = select(models.Task)
    tasks = db.scalars(statement).all()
    return tasks


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    updated_task: TaskCreate,
    db: Session = Depends(get_db)
):
    task = db.get(models.Task, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = updated_task.title
    task.description = updated_task.description
    task.priority = updated_task.priority
    task.due_date = updated_task.due_date

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.get(models.Task, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return Response(status_code=204)


@router.patch("/{task_id}/status", response_model=TaskResponse)
def update_task_status(
    task_id: int,
    status_data: TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    task = db.get(models.Task, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = status_data.status

    db.commit()
    db.refresh(task)

    return task