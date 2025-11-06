// src/pages/RegisterPage.jsx

import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== verifyPassword) {
      alert('Wrong Password!');
      return;
    }
    console.log('Mock Register Attempt:', { username, password });
    alert('Mock Register Page');
  };

  return (
    <div className="page-container auth-page">
      <h2>Register</h2>
      <p>This is a mock page</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="verifyPassword">verifyPassword</label>
          <input 
            type="password"
            id="verifyPassword" 
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="button-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;