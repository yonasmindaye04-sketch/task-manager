/**
 * Type definitions for Task entities
 */

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export interface TasksState {
  tasks: Task[];
  filter: FilterStatus;
  loading: boolean;
  error: string | null;
}