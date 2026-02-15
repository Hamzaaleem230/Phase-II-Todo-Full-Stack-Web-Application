import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string, completed: boolean) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskToggle,
  onTaskDelete,
}) => {
  return (
    <ul className="list-none p-0 flex flex-col gap-4 w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onTaskToggle}
          onDelete={onTaskDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
