//frontend/components/navbar
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">BugTrail</h2>
      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/bugs">My Bugs</Link>
        <Link to="/projects">Projects</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      </nav>
      {user && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}
    </aside>
  );
}
