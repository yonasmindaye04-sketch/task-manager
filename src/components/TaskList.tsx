/**
 * Task List Component
 * Displays filtered list of tasks based on current filter status
 */

import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import TaskItem from './TaskItem';
import type { Task } from '../types/task.types';

const TaskList = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  /**
   * Filter tasks based on current filter status
   */
  const getFilteredTasks = (): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'all':
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  // Empty state message
  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No {filter !== 'all' ? filter : ''} tasks found
        </h3>
        <p className="text-gray-500">
          {filter === 'completed'
            ? 'Complete some tasks to see them here.'
            : filter === 'active'
            ? 'All tasks are completed! Great job!'
            : 'Add a new task to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;