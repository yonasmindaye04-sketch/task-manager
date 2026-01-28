import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=15"
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.map((t: any) => ({
      id: t.id,
      title: t.title,
      completed: t.completed,
    }));
  }
);
