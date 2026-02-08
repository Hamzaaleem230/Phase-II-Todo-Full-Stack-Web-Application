import React from 'react';
import TaskItem from './TaskItem'; // Import TaskItem

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
  onTaskDelete: (taskId: string) => void; // Add onTaskDelete prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle, onTaskDelete }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onTaskToggle} 
          onDelete={onTaskDelete} // Pass onDelete to TaskItem
        />
      ))}
    </ul>
  );
};

export default TaskList;