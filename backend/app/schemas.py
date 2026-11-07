from pydantic import BaseModel, ConfigDict, Field
from typing import Literal
from datetime import datetime

class TaskCreate(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

    title: str
    description: str
    priority: Literal["Low", "Medium", "High"]
    due_date: str = Field(alias="dueDate")

class TaskResponse(TaskCreate):
    id: int
    status: Literal["Pending", "In Progress", "Completed"]
    created_at: datetime
    updated_at: datetime

class TaskStatusUpdate(BaseModel):
    status: Literal["Pending", "In Progress", "Completed"]