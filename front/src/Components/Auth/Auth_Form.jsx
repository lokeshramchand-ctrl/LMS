import React from 'react';
import './auth.css';

const AuthForm = ({ type }) => {
  return (
    <form className="auth-form">
      {type === 'signup' && (
        <div className="auth-form-group">
          <label htmlFor="signupName">Full Name</label>
          <input type="text" id="signupName" placeholder="Your Name" required />
        </div>
      )}
      <div className="auth-form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="your@email.com" required />
      </div>
      <div className="auth-form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />
      </div>
      {type === 'signup' && (
        <div className="auth-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="••••••••" required />
        </div>
      )}
      <button type="button" className="auth-btn">
        {type === 'login' ? 'Login' : 'Create Account'}
      </button>
      <div className="auth-form-footer">
        {type === 'login' ? (
          <>Don't have an account? <a href="#signup">Sign up</a></>
        ) : (
          <>Already have an account? <a href="#login">Login</a></>
        )}
      </div>
    </form>
  );
};

export default AuthForm;