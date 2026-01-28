import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { fetchTasks } from '../features/tasks/tasksThunk';

export const useTasks = () => {
  const { tasks, filter, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter(task =>
          filter === 'completed' ? task.completed : !task.completed
        );

  return { tasks: filteredTasks, loading, error, fetchTasks };
};
