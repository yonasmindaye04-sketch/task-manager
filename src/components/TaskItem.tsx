import { Task } from "../features/tasks/tasksThunk";
import { useAppDispatch } from "../hooks/reduxHooks";
import { toggleTask, deleteTask } from "../features/tasks/tasksSlice";

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between border p-2">
      <span onClick={() => dispatch(toggleTask(task.id))}>
        {task.title}
      </span>
      {!task.completed && (
        <button onClick={() => dispatch(deleteTask(task.id))}>
          Delete
        </button>
      )}
    </div>
  );
}
