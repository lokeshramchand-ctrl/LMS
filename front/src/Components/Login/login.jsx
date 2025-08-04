import React, { useState, useEffect, useRef } from 'react';

const LoginPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captureImage, setCaptureImage] = useState(null);
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
        setMessage(
          "Error accessing the camera. Ensure your camera is enabled and allowed."
        );
      });
  }, []);

  const captureFace = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCaptureImage(imageData);
    setMessage("Image captured successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captureImage) {
      setMessage("Please capture an image before logging in");
      return;
    }

    if (!username || !password) {
      setMessage("Please enter both username and password");
      return;
    }

    setMessage("Login in progress...");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, face_image: captureImage }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setMessage("Login successful!");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

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
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Username input */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                required
              />
              <span style={styles.inputIcon}>👤</span>
            </div>

            {/* Password input */}
            <div style={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <span style={styles.inputIcon}>👁</span>
            </div>

            {/* Remember me and message */}
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
              {message && (
                <span style={{
                  ...styles.message,
                  color: message.includes('successful') ? '#10b981' : 
                         message.includes('captured') ? '#3b82f6' : '#ef4444'
                }}>
                  {message}
                </span>
              )}
            </div>

            {/* Capture Face button */}
            <button 
              type="button" 
              onClick={captureFace}
              style={{
                ...styles.captureButton,
                backgroundColor: captureImage ? '#10b981' : '#6366f1'
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={styles.buttonIcon}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor"/>
              </svg>
              <span>{captureImage ? 'Face Captured ✓' : 'Capture Face'}</span>
            </button>

            {/* Login button */}
            <button type="submit" style={styles.loginButton}>
              <svg
                viewBox="0 0 24 24"
                style={styles.buttonIcon}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" fill="currentColor"/>
              </svg>
              <span>Login</span>
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

          {/* Hidden canvas for image capture */}
          <canvas
            ref={canvasRef}
            width="300"
            height="200"
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Right side - Video Stream */}
      <div style={styles.rightSection}>
        <div style={styles.videoContainer}>
          <div style={styles.videoHeader}>
            <h3 style={styles.videoTitle}>Face Recognition</h3>
            <p style={styles.videoSubtitle}>Position your face in the camera</p>
          </div>
          <div style={styles.videoWrapper}>
            <video 
              ref={videoRef} 
              autoPlay 
              muted
              style={styles.video}
            />
            <div style={styles.videoOverlay}>
              <div style={styles.faceFrame}></div>
            </div>
          </div>
          {captureImage && (
            <div style={styles.capturedPreview}>
              <p style={styles.previewText}>Captured Image:</p>
              <img 
                src={captureImage} 
                alt="Captured face" 
                style={styles.capturedImage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8f9fa',
    position: 'fixed',
    top: 0,
    left: 0,
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
    flexWrap: 'wrap',
    gap: '0.5rem',
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
  message: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  captureButton: {
    width: '100%',
    padding: '0.75rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  buttonIcon: {
    width: '16px',
    height: '16px',
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  videoContainer: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2rem',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  videoHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  videoTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
  },
  videoSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    margin: 0,
  },
  videoWrapper: {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    display: 'block',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  faceFrame: {
    width: '200px',
    height: '200px',
    border: '3px solid #10b981',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
  },
  capturedPreview: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  previewText: {
    color: 'white',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  capturedImage: {
    width: '100px',
    height: '67px',
    borderRadius: '8px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
};

// Add CSS for the divider line and full page styling
const additionalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  #root {
    height: 100vh;
    width: 100vw;
  }
  
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
