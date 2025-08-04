import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    setError('');
    try {
      onLogin(username.trim());
      navigate('/chat');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to ChatApp</h1>
          <p>Enter your username to start chatting</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="username-input"
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 