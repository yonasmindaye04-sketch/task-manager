import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { fetchTasks } from "./features/tasks/tasksThunk";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <TaskForm />
      <Filter />
      <TaskList />
    </div>
  );
}
