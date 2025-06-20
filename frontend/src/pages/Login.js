import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Removed unused import

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await login(email, password);
    navigate('/bugs');
  } catch (err) {
    let errorMessage = 'Failed to login. Please check your credentials.';
    
    if (err.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email.';
    } else if (err.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (err.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.';
    }
    
    setError(errorMessage);
    console.error('Login error:', err.code, err.message);
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}