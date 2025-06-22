// frontend/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { FaBug, FaCheckCircle, FaExclamationCircle, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ assigned: 0, fixed: 0, open: 0, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/bugs/stats/${user.uid}`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user && user.role !== 'project_manager') {
      fetchStats();
    }
  }, [user]);

  const cardData = [
    {
      title: 'Assigned Bugs',
      value: stats.assigned,
      className: 'assigned',
      icon: <FaBug size={28} />,
      onClick: () => navigate('/bugs?filter=assigned')
    },
    {
      title: 'Fixed Bugs',
      value: stats.fixed,
      className: 'fixed',
      icon: <FaCheckCircle size={28} />,
      onClick: () => navigate('/bugs?filter=fixed')
    },
    {
      title: 'Open Bugs',
      value: stats.open,
      className: 'reported',
      icon: <FaExclamationCircle size={28} />,
      onClick: () => navigate('/bugs?filter=open')
    },
    {
      title: 'Total Bugs',
      value: stats.total,
      className: 'total',
      icon: <FaClipboardList size={28} />,
      onClick: () => navigate('/bugs')
    }
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Welcome, {user?.displayName || 'User'}!
      </h2>

      <div className="card-grid">
        {(user?.role === 'project_manager'
          ? cardData.slice(3, 4) // Only total for PM
          : cardData
        ).map((card, index) => (
          <div
            key={index}
            className={`card ${card.className}`}
            onClick={card.onClick}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ marginBottom: '0.5rem' }}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
