from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from uuid import UUID
from typing import List # Import List for List[TaskResponse]
from app.schemas.task import TaskResponse, TaskCreate, TaskUpdate
from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user_id
from app.crud import tasks as crud_tasks # Import the CRUD operations

tasks_router = APIRouter()

@tasks_router.get("/{user_id}/tasks", response_model=List[TaskResponse])
def read_tasks(
    user_id: UUID,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks of other users"
        )
    tasks = crud_tasks.get_tasks_by_user(db, current_user_id)
    return tasks

@tasks_router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskResponse)
def toggle_task_completion(
    user_id: UUID,
    task_id: UUID,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to modify tasks of other users"
        )
    
    task = crud_tasks.get_task_by_id_and_user(db, task_id, current_user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )
    
    task.completed = not task.completed
    updated_task = crud_tasks.update_task(db, task, TaskUpdate(completed=task.completed))
    return updated_task

@tasks_router.post("/{user_id}/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: UUID,
    task_create: TaskCreate,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for other users"
        )
    
    # Ensure the task being created is for the authenticated user
    # if task_create.user_id and task_create.user_id != current_user_id:
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail="Cannot create tasks for other users"
    #     )
    
    # Override user_id with the authenticated user's ID
    task_data = task_create.model_dump()
    task_data["user_id"] = current_user_id
    
    # Temporarily set ID to None so backend generates it
    # In a proper setup, the client might not send ID or backend will ignore it
    task_data["id"] = None 

    new_task = crud_tasks.create_task(db, TaskCreate(**task_data), current_user_id)
    return new_task

@tasks_router.get("/{user_id}/tasks/{task_id}", response_model=TaskResponse)
def get_task(
    user_id: UUID,
    task_id: UUID,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks of other users"
        )
    
    task = crud_tasks.get_task_by_id_and_user(db, task_id, current_user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )
    return task

@tasks_router.put("/{user_id}/tasks/{task_id}", response_model=TaskResponse)
def update_task_endpoint(
    user_id: UUID,
    task_id: UUID,
    task_update: TaskUpdate,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update tasks of other users"
        )
    
    existing_task = crud_tasks.get_task_by_id_and_user(db, task_id, current_user_id)
    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )
    
    updated_task = crud_tasks.update_task(db, existing_task, task_update)
    return updated_task

@tasks_router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_endpoint(
    user_id: UUID,
    task_id: UUID,
    current_user_id: UUID = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete tasks of other users"
        )
    
    task_to_delete = crud_tasks.get_task_by_id_and_user(db, task_id, current_user_id)
    if not task_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )
    
    crud_tasks.delete_task(db, task_to_delete)
    return