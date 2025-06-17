import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../firebase';

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Bug Tracker</Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/bugs" className="hover:text-gray-300">Bugs</Link>
              <Link to="/projects" className="hover:text-gray-300">Projects</Link>
              <div className="flex items-center">
                <img 
                  src={currentUser.photoURL || '/default-avatar.png'} 
                  alt="User" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{currentUser.displayName || currentUser.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;