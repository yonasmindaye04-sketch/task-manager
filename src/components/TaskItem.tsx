/**
 * Task Item Component
 * Displays individual task with edit, delete, and toggle functionality
 */

import { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import  { toggleTask, editTask, deleteTask } from '../features/tasks/tasksSlice';
import type { Task } from '../types/task.types';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState<string | null>(null);

  /** Toggle task completion */
  const handleToggle = () => {
    dispatch(toggleTask(task.id)); // ✅ number
  };

  /** Delete task (only if not completed) */
  const handleDelete = () => {
    if (!task.completed) {
      dispatch(deleteTask(task.id)); // ✅ number
    }
  };

  /** Start editing */
  const handleStartEdit = () => {
    if (!task.completed) {
      setIsEditing(true);
      setEditTitle(task.title);
      setEditError(null);
    }
  };

  /** Save edited task */
  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle.length === 0) {
      setEditError('Task title cannot be empty');
      return;
    }

    if (trimmedTitle.length < 3) {
      setEditError('Task title must be at least 3 characters long');
      return;
    }

    dispatch(
      editTask({
        id: task.id,          // ✅ number
        title: trimmedTitle,  // ✅ string
      })
    );

    setIsEditing(false);
    setEditError(null);
  };

  /** Cancel editing */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditError(null);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all
        ${task.completed ? 'opacity-75' : ''}`}
    >
      {isEditing ? (
        /* Edit Mode */
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              setEditError(null);
            }}
            className={`w-full px-3 py-2 rounded-lg border-2
              ${editError ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            autoFocus
          />

          {editError && (
            <p className="text-sm text-red-600">{editError}</p>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Display Mode */
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 text-blue-600 rounded cursor-pointer"
          />

          <div className="flex-1">
            <p
              className={`font-medium ${
                task.completed
                  ? 'line-through text-gray-500'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </p>
            <p className="text-xs text-gray-500">
              {task.completed ? 'Completed' : 'Active'}
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleStartEdit}
              disabled={task.completed}
              className={`py-2 px-4 rounded-lg ${
                task.completed
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={task.completed}
              className={`py-2 px-4 rounded-lg ${
                task.completed
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
