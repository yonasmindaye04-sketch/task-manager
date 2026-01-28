/**
 * Error State Component
 * Displays user-friendly error messages with retry option
 */

import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchTasks } from '../features/tasks/tasksThunk';
import  { clearError } from '../features/tasks/tasksSlice';

interface ErrorStateProps {
  message: string;
}

const ErrorState = ({ message }: ErrorStateProps) => {
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchTasks());
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-4">{message}</p>
      
      <button
        onClick={handleRetry}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;