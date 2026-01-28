import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchTasks, addTask, toggleTask, editTask, deleteTask, setFilter, Task } from '../features/tasks/tasksSlice';

export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks, // For counts if needed
    status,
    error,
    filter,
    fetchTasks: () => dispatch(fetchTasks()),
    addTask: (title: string) => dispatch(addTask(title)),
    toggleTask: (id: string) => dispatch(toggleTask(id)),
    editTask: (id: string, title: string) => dispatch(editTask({ id, title })),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
    setFilter: (f: 'all' | 'completed' | 'active') => dispatch(setFilter(f)),
  };
};