import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/bugs" style={{ marginRight: '1rem' }}>Bugs</Link>
      <Link to="/projects">Projects</Link>
    </nav>
  );
}