import React, { useState } from 'react';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length >= 3) {
      onAdd(trimmed);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add</button>
    </form>
  );
};

export default AddTaskForm;