import React from "react";
import "./layout.css";
import HamburgerIcon from "./icons/hamburger.png";
import CoursesIcon from "./icons/book-alt.png";
import AssignmentsIcon from "./icons/search.png";
import ProfileIcon from "./icons/user.png";
import VideoCall from "./icons/video-camera-alt.png";

const Layout = () => {
  return (
    <div className="dashboard-container">
      {/* Top-Centered Horizontal Navbar */}
      <nav className="left-navbar">
        <ul>
          <li>
            <button className="nav-button">
              <img src={HamburgerIcon} alt="Hamburger" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <img src={CoursesIcon} alt="Courses" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <img src={AssignmentsIcon} alt="Assignments" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <img src={VideoCall} alt="Video Call" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <img src={ProfileIcon} alt="Profile" className="nav-icon" />
            </button>
          </li>
        </ul>
      </nav>

      {/* Optional: Bento Section */}
      {/*
      <div className="bento-container">
        <div className="bento-box">
          UPGRADE DISCOUNT<br />
          Upgrade today to enable unlimited projects.<br />
          $12.99<br />
          DISCOUNT CODE: G158FG35
        </div>
        <div className="bento-box">Urbanist typeface<br />Aa</div>
        <div className="bento-box">technexus</div>
        <div className="bento-box">Connecting Ideas, Empowering Innovation</div>
        <div className="bento-box">Connecting Ideas, Empowering Innovation</div>
        <div className="bento-box">Additional content here</div>
      </div>
      */}
    </div>
  );
};

export default Layout;
