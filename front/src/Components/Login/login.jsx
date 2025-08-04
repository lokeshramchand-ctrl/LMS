import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div style={styles.container}>
      {/* Left side - Login Form */}
      <div style={styles.leftSection}>
        <div style={styles.formContainer}>
          {/* Home icon and title */}
          <div style={styles.header}>
            <div style={styles.homeIcon}>🏠</div>
            <h1 style={styles.title}>Welcome home</h1>
            <p style={styles.subtitle}>Please enter your details.</p>
          </div>

          {/* Form */}
          <form style={styles.form}>
            {/* Email input */}
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
              <span style={styles.inputIcon}>📧</span>
            </div>

            {/* Password input */}
            <div style={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span style={styles.inputIcon}>👁</span>
            </div>

            {/* Remember me and Forgot password */}
            <div style={styles.optionsRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember for 30 days
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Login button */}
            <button type="submit" style={styles.loginButton}>
              Login
            </button>

            {/* OR divider */}
            <div style={styles.divider}>
              <span style={styles.dividerText}>OR</span>
            </div>

            {/* Social login buttons */}
            <div style={styles.socialButtons}>
              <button type="button" style={styles.socialButton}>
                🍎
              </button>
              <button type="button" style={styles.socialButton}>
                G
              </button>
              <button type="button" style={styles.socialButton}>
                f
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div style={styles.rightSection}>
        <div style={styles.gradientBackground}></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8f9fa',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: 'white',
  },
  formContainer: {
    width: '100%',
    maxWidth: '360px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  homeIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    border: '1.5px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  inputIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
    fontSize: '1rem',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    margin: '0.5rem 0',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    margin: 0,
  },
  forgotLink: {
    color: '#4f46e5',
    textDecoration: 'none',
  },
  loginButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
  },
  divider: {
    position: 'relative',
    margin: '1.5rem 0',
    textAlign: 'center',
  },
  dividerText: {
    backgroundColor: 'white',
    padding: '0 1rem',
    color: '#999',
    fontSize: '0.85rem',
    position: 'relative',
    zIndex: 1,
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  socialButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '1.5px solid #e1e5e9',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'border-color 0.2s',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    maxWidth: '500px',
    maxHeight: '600px',
    borderRadius: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
};

// Add CSS for the divider line
const additionalCSS = `
  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e1e5e9;
    z-index: 0;
  }
`;

// Inject additional CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
}

export default LoginPage;
