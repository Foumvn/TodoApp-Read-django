import React, { useState } from 'react';
import axios from 'axios';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/todos/', {
        title,
        description,
        completed,
      });

      // Réinitialiser les champs après l'envoi réussi
      setTitle('');
      setDescription('');
      setCompleted(false);
      setError(null);
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Error creating todo. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Save Todo</button>
    </form>
  );
}

export default TodoForm;