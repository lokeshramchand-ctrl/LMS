import React, { useState, useEffect, useRef } from "react";
import "./teste.css";
const Teste = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captureImage, setCaptureImage] = useState(null);

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
            <img src="./src/assets/1.png"></img>
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
          <button type="submit">
            <div class="bgContainer">
              <span>Hover</span>
              <span>Hover</span>
            </div>
            <div class="arrowContainer">
              <svg
                width="25"
                height="25"
                viewBox="0 0 45 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                  fill="black"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Teste;
