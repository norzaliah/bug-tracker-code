// frontend/pages/BugForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/BugForm.css';

export default function BugForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user has role info
  const [bug, setBug] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    dueDate: '',
    owner: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const isEdit = Boolean(id);

  const isEditable = user && ['developer', 'tester'].includes(user.role);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    const fetchBug = async () => {
      try {
        const res = await api.get(`/bugs/${id}`);
        const data = res.data;
        setBug({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          dueDate: data.dueDate?.slice(0, 10),
          owner: data.owner?._id || '',
        });
      } catch (err) {
        console.error('Failed to load bug:', err);
        setError('Failed to load bug details.');
      }
    };

    fetchUsers();
    if (isEdit) fetchBug();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug({ ...bug, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) return;

    try {
      if (isEdit) {
        await api.put(`/bugs/${id}`, bug);
      } else {
        await api.post('/bugs', bug);
      }
      navigate('/bugs');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit bug.');
    }
  };

  const handleDelete = async () => {
    if (!isEditable) return;

    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await api.delete(`/bugs/${id}`);
        navigate('/bugs');
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete bug.');
      }
    }
  };

  return (
    <div className="bug-form-container">
      <h2>{isEdit ? 'Bug Details' : 'Report a New Bug'}</h2>
      {error && <p className="error">{error}</p>}

      <form className="bug-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={bug.title}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={bug.description}
          onChange={handleChange}
          disabled={!isEditable}
        />

        <label>Priority</label>
        <select
          name="priority"
          value={bug.priority}
          onChange={handleChange}
          disabled={!isEditable}
        >
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label>Status</label>
        <select
          name="status"
          value={bug.status}
          onChange={handleChange}
          disabled={!isEditable}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={bug.dueDate}
          onChange={handleChange}
          disabled={!isEditable}
        />

        <label>Assign to</label>
        <select
          name="owner"
          value={bug.owner}
          onChange={handleChange}
          disabled={!isEditable}
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>

        {isEditable && (
          <div>
            <button type="submit">
              {isEdit ? 'Update Bug' : 'Create Bug'}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: '#dc3545',
                  marginLeft: '1rem',
                }}
              >
                Delete Bug
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
