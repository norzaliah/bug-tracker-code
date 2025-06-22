// frontend/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.js'; // now refers to the old Sidebar
import './Layout.css'; // styling

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
