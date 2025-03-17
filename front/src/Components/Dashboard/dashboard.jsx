import React from "react";
import "./dashboar.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Left Floating Navbar */}
      <nav className="left-navbar">
        <ul>
          <li>🏠 Home</li>
          <li>📚 Courses</li>
          <li>📝 Assignments</li>
          <li>⚙️ Settings</li>
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