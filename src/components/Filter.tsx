import { useAppDispatch } from "../hooks/reduxHooks";
import { setFilter } from "../features/tasks/tasksSlice";

export default function Filter() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2">
      <button onClick={() => dispatch(setFilter("all"))}>All</button>
      <button onClick={() => dispatch(setFilter("active"))}>Active</button>
      <button onClick={() => dispatch(setFilter("completed"))}>
        Completed
      </button>
    </div>
  );
}
