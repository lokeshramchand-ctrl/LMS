import React, { useState, useEffect, useRef } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [captureImage, setCaptureImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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
        setMessage("Error accessing the camera. Ensure your camera is enabled and allowed.");
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureFace = () => {
    if (!videoRef.current) {
      setMessage("Please allow access to the camera");
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCaptureImage(imageData);
    setMessage("Image captured");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captureImage) {
      setMessage("Please capture an image before registering");
      return;
    }

    if (!username || !password) {
      setMessage("Please enter both username and password");
      return;
    }

    setMessage("Registration in progress...");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          face_image: captureImage,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="entire">
      <form onSubmit={handleSubmit}>
        <div className="left-container">
          <div className="register-image">
            <video ref={videoRef} autoPlay></video>
            <button type="button" onClick={captureFace} className="animated-button">
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Capture</span>
              <span className="circle"></span>
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
            <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }}></canvas>
          </div>
        </div>

        <div className="middle-container">
          <div className="input__container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="input__search"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input_search"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="animated-button">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Register</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </div>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default Register;
