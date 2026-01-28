import { useAppSelector } from "../hooks/reduxHooks";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, filter, loading } = useAppSelector(s => s.tasks);

  if (loading) return <div>Loading...</div>;

  const filtered = tasks.filter(t =>
    filter === "all"
      ? true
      : filter === "completed"
      ? t.completed
      : !t.completed
  );

  return (
    <>
      {filtered.map(t => (
        <TaskItem key={t.id} task={t} />
      ))}
    </>
  );
}
