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
  <div class="shadow__input"></div>
  <button class="input__button__shadow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#000000"
      width="20px"
      height="20px"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      ></path>
    </svg>
  </button>
  <input
    type="text"
    name="username"
    class="input__search"
    placeholder="Enter username"
  />
</div>
</div>
    </div>
  );
};

export default Register;
