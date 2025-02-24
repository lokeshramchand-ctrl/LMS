import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="Entire">
      <div className="image-container">
        <div className="register-image">
          <img src="./src/assets/1.png" alt="Register" />
        </div>
      </div>
      <div className="right-container">
        <div class="input__container">
          <input
            type="text"
            name="username"
            class="input__search"
            placeholder="Enter username"
          />
        </div>
        <div class="input_container">
          <input
            type="text"
            name="username"
            class="input_search"
            placeholder="Enter username"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
