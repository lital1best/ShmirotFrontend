import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [userType, setUserType] = useState('soldier');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    serviceNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', { userType, credentials });
      setIsLoading(false);
      // Here you would typically handle the actual authentication
    }, 2000);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCredentials({
      username: '',
      password: '',
      serviceNumber: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="military-pattern"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="military-emblem">
            <div className="star-badge">★</div>
          </div>
          <h1 className="login-title">MILITARY ACCESS PORTAL</h1>
          <p className="login-subtitle">Secure Authentication System</p>
        </div>

        <div className="user-type-selector">
          <button
            type="button"
            className={`user-type-btn ${userType === 'soldier' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('soldier')}
          >
            <div className="rank-icon">🎖️</div>
            <span>REGULAR SOLDIER</span>
          </button>
          <button
            type="button"
            className={`user-type-btn ${userType === 'jobmaster' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('jobmaster')}
          >
            <div className="rank-icon">⭐</div>
            <span>JOB MASTER</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              {userType === 'jobmaster' ? 'OFFICER ID' : 'SOLDIER ID'}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="form-input"
              placeholder={userType === 'jobmaster' ? 'Enter Officer ID' : 'Enter Soldier ID'}
              required
            />
          </div>

          {userType === 'soldier' && (
            <div className="form-group">
              <label htmlFor="serviceNumber" className="form-label">
                SERVICE NUMBER
              </label>
              <input
                type="text"
                id="serviceNumber"
                name="serviceNumber"
                value={credentials.serviceNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter Service Number"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              SECURITY CODE
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter Security Code"
              required
            />
          </div>

          <button
            type="submit"
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                AUTHENTICATING...
              </>
            ) : (
              <>
                <span>🔐</span>
                SECURE LOGIN
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="security-notice">
            <span className="security-icon">🛡️</span>
            <span>CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY</span>
          </div>
          <div className="help-links">
            <a href="#forgot" className="help-link">Forgot Credentials?</a>
            <span className="separator">|</span>
            <a href="#support" className="help-link">Technical Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;