import React, { useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import AddTaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import Filter from './components/Filter.tsx';
import Skeleton from './components/Skeleton.tsx';

const App: React.FC = () => {
  const { tasks, status, error, filter, fetchTasks, addTask, toggleTask, editTask, deleteTask, setFilter } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <AddTaskForm onAdd={addTask} />
      <Filter currentFilter={filter} onSetFilter={setFilter} />
      {status === 'loading' && <Skeleton />}
      {status === 'failed' && <p className="text-red-500 text-center">{error}</p>}
      {status === 'succeeded' && (
        <TaskList tasks={tasks} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
      )}
    </div>
  );
};

export default App;