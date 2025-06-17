import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Bugs() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const { data } = await api.get('/bugs');
        setBugs(data);
      } catch (err) {
        console.error('Error fetching bugs:', err);
      }
    };
    fetchBugs();
  }, []);

  return (
    <div>
      <h2>All Bugs</h2>
      {bugs.map(bug => (
        <div key={bug._id}>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
        </div>
      ))}
    </div>
  );
}