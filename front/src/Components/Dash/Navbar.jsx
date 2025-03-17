import React from 'react';
import './styles/dashboard.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>BohoLearn</span>
        </div>
        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#courses">My Courses</a></li>
          <li><a href="#calendar">Calendar</a></li>
          <li><a href="#meetings">Meetings</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
        <div className="user-menu">
          <div className="user-trigger">
            <div className="avatar">JS</div>
            <span>Jane Smith</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;