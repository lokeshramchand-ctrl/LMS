import React from 'react';
import './styles/dashboard.css';

const StatsCard = ({ title, value }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-title">{title}</div>
      <div className="stats-card-value">{value}</div>
    </div>
  );
};

export default StatsCard;