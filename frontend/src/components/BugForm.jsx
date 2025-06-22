import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import './BugForm.css';

export default function BugForm() {
  const { id } = useParams(); // If id exists, it's edit mode
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    dueDate: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/bugs/${id}`)
        .then(res => setForm({ ...res.data }))
        .catch(err => {
          console.error('Failed to fetch bug:', err);
          setError('Bug not found or failed to load.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/bugs/${id}`, form);
      } else {
        await api.post('/bugs', form);
      }
      navigate('/bugs');
    } catch (err) {
      setError('Failed to save bug');
      console.error(err);
    }
  };

  return (
    <div className="bug-form-container">
      <h2>{id ? 'Edit Bug' : 'Report New Bug'}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="bug-form">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <label>Due Date</label>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate?.slice(0, 10) || ''}
          onChange={handleChange}
        />

        <button type="submit">{id ? 'Update Bug' : 'Report Bug'}</button>
      </form>
    </div>
  );
}
