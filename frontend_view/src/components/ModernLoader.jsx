import React from "react";
import "./Mainloader.css"; // Import the CSS file

const ModernLoader = () => {
  return (
    <div className="loader-container">
      <div className="background-gradient"></div>
      <div className="loader-content">
        <div className="spinner-container">
          <div className="outer-ring"></div>
          <div className="middle-ring"></div>
          <div className="inner-pulse"></div>
          <div className="center-icon">⚡</div>
        </div>
        <div className="loading-text">Loading</div>
        <div className="particle1"></div>
        <div className="particle2"></div>
        <div className="particle3"></div>
        <div className="particle4"></div>
        <div className="particle5"></div>
        <div className="particle6"></div>
      </div>
    </div>
  );
};

export default ModernLoader;
