from pydantic import BaseModel, ConfigDict, Field
from typing import Literal
from datetime import datetime
from pydantic import field_validator

class TaskCreate(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

    title: str = Field(
        min_length=1,
        max_length=200
    )

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        trimmed_value = value.strip()

        if not trimmed_value:
            raise ValueError("Title cannot be empty or contain only spaces")

        return trimmed_value

    description: str = Field(
        max_length=2000
    )

    priority: Literal["Low", "Medium", "High"]

    due_date: str = Field(
        alias="dueDate",
        min_length=10,
        max_length=10
    )

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, value: str) -> str:
        try:
            datetime.strptime(value, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Due date must be a valid date in YYYY-MM-DD format")

        return value

class TaskResponse(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

    id: int
    title: str
    description: str
    status: Literal["Pending", "In Progress", "Completed"]
    priority: Literal["Low", "Medium", "High"]
    due_date: str = Field(alias="dueDate")
    created_at: datetime
    updated_at: datetime

class TaskStatusUpdate(BaseModel):
    status: Literal["Pending", "In Progress", "Completed"]