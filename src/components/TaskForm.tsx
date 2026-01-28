/**
 * Task Form Component
 * Handles adding new tasks with validation
 */

import { useState } from 'react';
import type { FormEvent } from 'react';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTask } from '../features/tasks/tasksSlice';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  /**
   * Validate task title according to requirements:
   * - Must not be empty or only whitespace
   * - Must be at least 3 characters long
   */
  const validateTitle = (value: string): string | null => {
    const trimmedValue = value.trim();
    
    if (trimmedValue.length === 0) {
      return 'Task title cannot be empty';
    }
    
    if (trimmedValue.length < 3) {
      return 'Task title must be at least 3 characters long';
    }
    
    return null;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Dispatch action to add task
    dispatch(addTask(title.trim()));
    
    // Reset form
    setTitle('');
    setError('');
  };

  const handleInputChange = (value: string) => {
    setTitle(value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter task title (min 3 characters)..."
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            `}
          />
          
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;