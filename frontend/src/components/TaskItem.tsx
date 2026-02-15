import React from "react";

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
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <li
      className="
        w-full
        bg-white dark:bg-zinc-900
        border border-gray-200 dark:border-gray-700
        rounded-lg
        p-4
        shadow-sm
        flex
        flex-col
        sm:flex-row
        sm:items-center
        gap-4
        transition
      "
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          onToggleComplete(task.id, !task.completed)
        }
        className="w-4 h-4 sm:w-5 sm:h-5 accent-blue-600"
      />

      {/* Task Content */}
      <div className="flex-1">
        <h2
          className={`text-base sm:text-lg font-semibold ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {task.title}
        </h2>

        {task.description && (
          <p className="text-sm text-gray-500 mt-1">
            {task.description}
          </p>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="
          w-full
          sm:w-auto
          px-4
          py-2
          text-sm
          rounded-lg
          bg-red-500
          hover:bg-red-600
          text-white
          transition
        "
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
