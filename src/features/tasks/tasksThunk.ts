/**
 * Redux Thunks for async task operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Task } from '../../types/task.types';

/**
 * Fetch tasks from JSONPlaceholder API
 * Limits to 15 tasks as per requirements
 */
export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data: Task[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);