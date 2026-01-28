/**
 * Main App Component
 * Root component that orchestrates the Task Manager application
 */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchTasks } from './features/tasks/tasksThunk';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.tasks);

  /**
   * Fetch tasks on component mount
   */
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Advanced Task Manager
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with your personal task manager
          </p>
        </header>

        {/* Main Content */}
        <main>
          {/* Show error state if there's an error */}
          {error && <ErrorState message={error} />}

          {/* Show loading state while fetching */}
          {loading && !error && <LoadingState />}

          {/* Show app content when not loading and no error */}
          {!loading && !error && (
            <>
              <TaskForm />
              <FilterButtons />
              <TaskList />
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with React, Redux Toolkit, TypeScript, and Tailwind CSS</p>
          <p className="mt-1">© 2026 Task Manager by Yonas Mindaye. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;