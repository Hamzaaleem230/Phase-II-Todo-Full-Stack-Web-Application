import React from 'react';

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void; // Add onDelete prop
  // onEdit: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggleComplete(task.id, !task.completed)} 
        style={{ marginRight: '10px' }}
      />
      <div style={{ flexGrow: 1 }}>
        <h2 style={{ margin: '0 0 5px 0', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h2>
        {task.description && <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>{task.description}</p>}
      </div>
      <button 
        onClick={() => onDelete(task.id)} 
        style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Delete
      </button>
      {/* Add edit button here later */}
    </li>
  );
};

export default TaskItem;