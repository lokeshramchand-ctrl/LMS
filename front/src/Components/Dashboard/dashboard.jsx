import React from "react";
import "./dashboard.css";
import HomeIcon from "./icons/home.png";
import CoursesIcon from "./icons/book-alt.png";
import AssignmentsIcon from "./icons/search.png";
import ProfileIcon from "./icons/user.png";
import Megaphone from "./icons/megaphone.png";
import VideoCall from "./icons/video-camera-alt.png";


 
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Left Floating Navbar */}
      <nav className="left-navbar">
        <ul>
          <li>
            <button className="nav-button">
              <img src={HomeIcon} alt="Home" className="nav-icon" />
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
              <img src={VideoCall} alt="Video" className="nav-icon" />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <img src={ProfileIcon} alt="Profile" className="nav-icon" />
            </button>
          </li>

        </ul>
      </nav>

      {/* Main Bento Grid Layout */}
      <div className="bento-container">
        <div className="bento-box">
          UPGRADE DISCOUNT<br />
          Upgrade today to enable unlimited projects.<br />
          $12.99<br />
          DISCOUNT CODE: G158FG35
        </div>
        <div className="bento-box">
          Urbanist typeface<br />
          Aa
        </div>
        <div className="bento-box">
          technexus
        </div>
        <div className="bento-box">
          Connecting Ideas, Empowering Innovation
        </div>
        <div className="bento-box">
          Connecting Ideas, Empowering Innovation
        </div>
        <div className="bento-box">
          Additional content here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;