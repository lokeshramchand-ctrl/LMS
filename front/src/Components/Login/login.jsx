import React, { useState, useEffect, useRef } from "react";
import "./login.css";
const Login = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captureImage, setCaptureImage] = useState(null);
  const [message, setMessage] = useState("");

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
    setMessage("Image captured");
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

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("face_image", captureImage);

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
    <div className="entire">
      <form onSubmit={handleSubmit}>
        <div className="left-container">
          <div className="register-image">
            <video ref={videoRef} autoPlay></video>
            <button type="capture-button" onClick={captureFace}>
              Capture Face
            </button>

          </div>
        </div>

        <div className="middle-container">
          <div className="input__container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              class="input__search"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              class="input_search"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </div>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default Login;
