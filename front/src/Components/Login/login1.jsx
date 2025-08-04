import React from "react";
import "./login.css";

const Login1 = () => {
      return (
            <div className="entire">
                  {/* Position the toggle in the top right */}
                  <div className="toggle-position-wrapper">
                        <div className="toggle-wrapper">
                              <input className="toggle-checkbox" type="checkbox" />
                              <div className="toggle-container">
                                    <div className="toggle-button">
                                          <div className="toggle-button-circles-container">
                                                {Array.from({ length: 12 }).map((_, i) => (
                                                      <div key={i} className="toggle-button-circle"></div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Your login form or other content can go here */}
                  <div className="VideoContainer">
                        <img src="/assets/3.jpeg" alt="Visual" />
                  </div>

                  <div className="FormContainer">
                        <form class="form">
                              <span class="input-span">
                                    <label for="email" class="label">Email</label>
                                    <input type="email" name="email" id="email"
                                    /></span>
                              <span class="input-span">
                                    <label for="password" class="label">Password</label>
                                    <input type="password" name="password" id="password"
                                    /></span>
                              <span class="span"><a href="#">Forgot password?</a></span>
                              <input class="submit" type="submit" value="Log in" />
                              <span class="span">Don't have an account? <a href="#">Sign up</a></span>
                        </form>
                  </div>
            </div>
      );
};

export default Login1;
