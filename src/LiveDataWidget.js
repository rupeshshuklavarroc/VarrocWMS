import React from 'react';
import { Link } from 'react-router-dom';
import "./LoginPage.css";
import logo from "./live.png";

const LiveDataWidget = () => {
  return (
    <Link to="/live">
      <div className="widget live-data-widget">
      <img src={logo} alt="LiveLogo" />
        <p>Live Data</p>
      </div>
    </Link>
  );
};

export default LiveDataWidget;
