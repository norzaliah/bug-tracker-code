// frontend/src/components/LoginForm.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/bugs'); // Redirect to dashboard
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/bugs'); // Redirect to dashboard
    } catch (err) {
      setError('Failed to login with Google.');
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="error-message">{error}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="password-label">
        Password
        <span className="forgot">Forgot password?</span>
      </label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="login-btn">Log In</button>

      <div className="or">OR</div>

      <button type="button" className="google-btn" onClick={handleGoogleLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
          alt="G"
        />
        Continue with Google
      </button>
    </form>
  );
};

export default LoginForm;
