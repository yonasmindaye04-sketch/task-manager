import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // Install with `npm install nanoid`

// Install nanoid for unique IDs: npm install nanoid

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: 'all' | 'completed' | 'active';
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return data.map((todo: any) => ({
    id: todo.id.toString(),
    title: todo.title,
    completed: todo.completed,
  })) as Task[];
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const title = action.payload.trim();
      if (title.length < 3) return; // Validation
      state.tasks.push({ id: nanoid(), title, completed: false });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task && !task.completed) {
        const title = action.payload.title.trim();
        if (title.length >= 3) task.title = title;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload);
      if (index !== -1 && !state.tasks[index].completed) {
        state.tasks.splice(index, 1);
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { addTask, toggleTask, editTask, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;