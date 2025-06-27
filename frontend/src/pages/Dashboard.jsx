// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';
import ProgressPieChart from '../components/ProgressPieChart';


export default function Dashboard() {
  const { currentUser } = useAuth();
  const [location, setLocation] = useState('Fetching...');

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Location not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.state || 'Unknown';
          setLocation(city);
        } catch (err) {
          setLocation('Unable to fetch location');
        }
      },
      () => {
        setLocation('Permission denied');
      }
    );
  }, []);

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0];
  const avatarUrl = currentUser?.photoURL || `https://ui-avatars.com/api/?name=${displayName}`;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">
        <div className="main-content">
          {/* 🟣 Top Section */}
          <div className="top-section">
            <div className="top-card">
              <div className="search-add">
                <input type="text" placeholder="Search bugs, projects..." />
                <Link to="/bugs/new" className="add-btn">+ Add Bug</Link>
              </div>
            </div>

            <div className="top-card welcome-card">
              <div>
                <h2>Welcome back, {displayName}!</h2>
                <p>📍 Location: {location}</p>
              </div>
              <div className="user-avatar">
                <img src={avatarUrl} alt="User Avatar" />
              </div>
            </div>
          </div>

          {/* 🟡 Widgets */}
          <div className="widget-grid">
            <div className="widget-card"><h3>Assigned Bugs</h3><p>21</p></div>
            <div className="widget-card"><h3>Fixed Bugs</h3><p>41</p></div>
            <div className="widget-card"><h3>Open Bugs</h3><p>5</p></div>
            <div className="widget-card"><h3>Total Bugs</h3><p>58</p></div>
          </div>

          {/* 📊 Overview */}
          <div className="overview">
            <div className="bug-metrics">
              <div><span>Bugs:</span> <b>58</b></div>
              <div><span>Completed:</span> <b>41</b></div>
              <div><span>On Hold:</span> <b>10</b></div>
              <div><span>Delayed:</span> <b>3</b></div>
              <div><span>Canceled:</span> <b>5</b></div>
            </div>
          </div>

          {/* 🐞 Bugs Table */}
          <section className="card">
            <div className="section-header">
              <h2>Bugs</h2>
              <NavLink to="/bugs">View All</NavLink>
            </div>
            <table className="table bugs-table">
              <thead>
                <tr>
                  <th>Bug Name</th>
                  <th>Completed</th>
                  <th>Owner</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {["active", "inprogress", "onhold", "canceled", "delayed"].map((status, index) => (
                  <tr key={index}>
                    <td>Crash</td>
                    <td>36%</td>
                    <td>Qila</td>
                    <td>31-May-2025</td>
                    <td>High</td>
                    <td><span className={`status ${status}`}>{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 📁 Projects Table */}
          <section className="card project-section">
            <div className="section-header">
              <h2>My Projects</h2>
              <NavLink to="/projects">View All</NavLink>
            </div>

            <div className="project-filters">
              <button className="active-filter">All</button>
              <button>Recently Activity</button>
              <button>Active</button>
              <button>In Progress</button>
              <button>On Hold</button>
              <button>Canceled</button>
              <button>Delayed</button>
            </div>

            <table className="table projects-table">
              <thead>
                <tr>
                  <th>Bug Name</th>
                  <th>Completed</th>
                  <th>Priority</th>
                  <th>Last Updated</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Display Problem</td>
                  <td>16%</td>
                  <td>High</td>
                  <td>Today 10:30 am</td>
                  <td>31-May-2025</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* 🧭 Right Panel */}
        <aside className="right-panel">
          <div className="calendar">
            <h3>Calendar</h3>
            <p>May, 2025</p>
            <div className="calendar-grid">
              <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
              {[...Array(31)].map((_, i) => (
                <div key={i} className={i === 23 ? 'highlight' : ''}>{i + 1}</div>
              ))}
            </div>
          </div>

          <div className="progress-section">
            <h3>Overall Progress</h3>
            <ProgressPieChart
            completed={41}
            onHold={10}
            delayed={3}
            canceled={5}
            total={58}
            />
          </div>

          <div className="team-section">
            <div className="section-header">
              <h3>My Team</h3>
              <NavLink to="/team">Manage</NavLink>
            </div>
            <ul>
              <li><b>Zaliah Abdullah</b> - Team Leader</li>
              <li>Fasihah Asri - Member</li>
              <li>Ayuni Aziz - Member</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
