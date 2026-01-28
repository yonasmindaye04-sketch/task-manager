import React from 'react';

interface FilterProps {
  currentFilter: 'all' | 'completed' | 'active';
  onSetFilter: (filter: 'all' | 'completed' | 'active') => void;
}

const Filter: React.FC<FilterProps> = ({ currentFilter, onSetFilter }) => (
  <div className="flex justify-center space-x-4 mb-4">
    <button
      onClick={() => onSetFilter('all')}
      className={currentFilter === 'all' ? 'font-bold' : ''}
    >
      All
    </button>
    <button
      onClick={() => onSetFilter('active')}
      className={currentFilter === 'active' ? 'font-bold' : ''}
    >
      Active
    </button>
    <button
      onClick={() => onSetFilter('completed')}
      className={currentFilter === 'completed' ? 'font-bold' : ''}
    >
      Completed
    </button>
  </div>
);

export default Filter;