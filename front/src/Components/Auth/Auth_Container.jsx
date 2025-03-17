import React, { useState } from 'react';
import AuthTabs from './Auth_Tabs';
import AuthForm from './Auth_Form';
import './auth.css';

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-container">
      <div className="auth-box">
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'login' ? (
          <AuthForm type="login" />
        ) : (
          <AuthForm type="signup" />
        )}
      </div>
      
    </div>
  );
};

export default AuthContainer;