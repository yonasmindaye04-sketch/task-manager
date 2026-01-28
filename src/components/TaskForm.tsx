import { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addTask } from "../features/tasks/tasksSlice";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const submit = () => {
    if (title.trim().length < 3) return;
    dispatch(addTask(title.trim()));
    setTitle("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 flex-1"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={submit} className="bg-blue-600 text-white px-4">
        Add
      </button>
    </div>
  );
}
