import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1 className="logo">BugTrail.</h1>
      </header>

      <div className="divider"></div>

      <main className="auth-form">
        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            placeholder="yaya.bugtrail@gmail.com" 
            className="input-field"
          />
        </div>

        <div className="input-group">
          <div className="password-header">
            <label>Password</label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <input 
            type="password" 
            placeholder="Enter a password" 
            className="input-field"
          />
        </div>

        <button className="login-button">Log In</button>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <button className="google-button">
          Continue with Google
        </button>
      </main>
    </div>
  );
};

export default Home;