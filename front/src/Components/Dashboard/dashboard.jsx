import React from "react";
import "./dashboar.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Left Floating Navbar */}
      <nav className="left-navbar">
        /*
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
          <div className="card">
            <div className="card1"></div>
          </div>
        </div>
        
        <div className="bento-box">
          <div className="card">
            <div className="card2"></div>
          </div>
        </div>

        <div className="bento-box">
          <div className="card">
            <div className="card3"></div>
          </div>
        </div>
        <div className="bento-box">
          <div className="card">
            <div className="card4"></div>
          </div>
        </div>
        <div className="bento-box">
          <div className="card">
            <div className="card5"></div>
          </div>
        </div>
        <div className="bento-box">
          <div className="card">
            <div className="card6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
