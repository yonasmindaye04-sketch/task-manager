import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks, Task } from "./tasksThunk";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: "all" | "completed" | "active";
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<TasksState["filter"]>) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, state => {
        state.loading = false;
        state.error = "Failed to load tasks";
      });
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } =
  tasksSlice.actions;

export default tasksSlice.reducer;
