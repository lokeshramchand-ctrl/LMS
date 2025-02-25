import React, { useState, useEffect, useRef } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [captureImage, setCaptureImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access the camera
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
    <div className="register-container">
      <h2>Register with Face Recognition</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="camera_container">
          <video ref={videoRef} width="100%" autoPlay></video>
          <button type="button" onClick={captureFace}>
            Capture Face
          </button>
          <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }}></canvas>
        </div>
        <button type="submit">Register</button>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default Register;
