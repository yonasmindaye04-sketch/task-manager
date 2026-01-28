/**
 * Filter Buttons Component
 * Allows users to filter tasks by status (all, active, completed)
 */

import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setFilter } from '../features/tasks/tasksSlice';
import type { FilterStatus } from '../types/task.types';

const FilterButtons = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Calculate counts for each filter
  const allCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const filters: { label: string; value: FilterStatus; count: number }[] = [
    { label: 'All', value: 'all', count: allCount },
    { label: 'Active', value: 'active', count: activeCount },
    { label: 'Completed', value: 'completed', count: completedCount },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${
                currentFilter === value
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {label}
            <span className="ml-2 text-sm opacity-80">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;