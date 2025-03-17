import React from 'react';
import './auth.css';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="auth-tabs">
      <div
        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
        onClick={() => setActiveTab('login')}
      >
        Login
      </div>
      <div
        className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
        onClick={() => setActiveTab('signup')}
      >
        Sign Up
      </div>
    </div>
  );
};

export default AuthTabs;