import React from 'react';
import './styles/dashboard.css';

const CourseCard = ({ title, instructor, progress }) => {
  return (
    <div className="course-card">
      <div className="course-img"></div>
      <div className="course-content">
        <div className="course-title">{title}</div>
        <div className="course-instructor">by {instructor}</div>
        <div className="course-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;