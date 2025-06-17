import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugList from './pages/BugList';
import BugDetail from './pages/BugDetail';
import CreateBug from './pages/CreateBug';
import EditBug from './pages/EditBug';
import ProjectList from './pages/ProjectList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/bugs" element={<PrivateRoute><BugList /></PrivateRoute>} />
              <Route path="/bugs/new" element={<PrivateRoute><CreateBug /></PrivateRoute>} />
              <Route path="/bugs/:id" element={<PrivateRoute><BugDetail /></PrivateRoute>} />
              <Route path="/bugs/:id/edit" element={<PrivateRoute><EditBug /></PrivateRoute>} />
              <Route path="/projects" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;