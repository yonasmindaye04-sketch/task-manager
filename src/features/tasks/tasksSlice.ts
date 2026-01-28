import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TasksState, FilterStatus } from '../../types/task.types';
import { fetchTasks } from './tasksThunk';

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    // --- ADDED REDUCERS START ---
    editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    // --- ADDED REDUCERS END ---
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch tasks';
      });
  },
});

// Added editTask, deleteTask, and clearError to the export list below
export const { 
  addTask, 
  toggleTask, 
  editTask, 
  deleteTask, 
  clearError, 
  setFilter 
} = tasksSlice.actions;

export default tasksSlice.reducer;