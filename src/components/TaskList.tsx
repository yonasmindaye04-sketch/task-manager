import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../features/tasks/tasksSlice';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => (
  <div className="space-y-2">
    {tasks.map(task => (
      <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList;