// frontend/pages/Bugs.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/bugs.css';
import { bugService } from '../services/api'; // Use your central service

export default function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [bugFilter, setBugFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBugs = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await bugService.getAllBugs();
        setBugs(response.data || []); // make sure it's an array
      } catch (err) {
        console.error('Error fetching bugs:', err.message);
        setError('Failed to load bugs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  const filteredBugs =
    bugFilter === 'All'
      ? bugs
      : bugs.filter((bug) => bug.status.toLowerCase() === bugFilter.toLowerCase());

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await bugService.deleteBug(id);
        setBugs((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error('Delete error:', err.message);
        alert('Failed to delete bug.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">
        <div className="main-content">
          {/* 🔍 Search and ➕ Add Bug */}
          <div className="top-section">
            <div className="top-card">
              <div className="search-add">
                <input type="text" placeholder="Search bugs..." />
                <Link to="/bugs/new" className="add-btn">+ Add Bug</Link>
              </div>
            </div>
          </div>

          {/* 🐞 Bug Filters */}
          <div className="bug-filters">
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
              <button
                key={status}
                className={bugFilter === status ? 'active-filter' : ''}
                onClick={() => setBugFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* 📋 Bug Table */}
          {loading ? (
            <div className="loading">Loading bugs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredBugs.length === 0 ? (
            <div className="no-bugs">No bugs found.</div>
          ) : (
            <section className="card">
              <table className="table bugs-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBugs.map((bug) => (
                    <tr key={bug._id}>
                      <td>{bug.title}</td>
                      <td>
                        <span className={`status status-${bug.status?.toLowerCase().replace(/\s/g, '')}`}>
                          {bug.status}
                        </span>
                      </td>
                      <td className={`priority priority-${bug.priority?.toLowerCase()}`}>
                        {bug.priority}
                      </td>
                      <td>{new Date(bug.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => alert(JSON.stringify(bug, null, 2))}
                        >
                          View
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/bugs/${bug._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(bug._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}