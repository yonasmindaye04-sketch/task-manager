import React, { useState } from 'react';
import { Task } from '../features/tasks/tasksSlice.ts';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (newTitle.trim().length >= 3) {
      onEdit(task.id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
          disabled={isEditing}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => e.key === 'Enter' && handleEdit()}
            className="border p-1"
            autoFocus
          />
        ) : (
          <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
        )}
      </div>
      {!task.completed && (
        <div>
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 mr-2">Edit</button>
          <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;