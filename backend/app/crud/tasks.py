from uuid import UUID
from sqlmodel import Session, select
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate

def get_tasks_by_user(session: Session, user_id: UUID) -> list[Task]:
    statement = select(Task).where(Task.user_id == user_id)
    return session.exec(statement).all()

def get_task_by_id_and_user(session: Session, task_id: UUID, user_id: UUID) -> Task | None:
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    return session.exec(statement).first()

def create_task(session: Session, task_create: TaskCreate, user_id: UUID) -> Task:
    task = Task.from_orm(task_create, update={"user_id": user_id})
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def update_task(session: Session, task: Task, task_update: TaskUpdate) -> Task:
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)  # Mutate in-place
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def delete_task(session: Session, task: Task):
    session.delete(task)
    session.commit()
