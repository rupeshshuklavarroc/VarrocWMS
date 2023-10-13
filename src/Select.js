import React from "react";
import { useNavigate } from "react-router-dom";
import { Op } from "./Actions/utils";
import "./LoginPage.css";
import logo from "./logo.png";

const Select = () => {
  const navigate = useNavigate();

  const handleEntryClick = async () => {
    Op({ value: 1 }); // Sending value 1 to the backend
    navigate("/entry"); // Redirect to /entry path
  };

  const handleExitClick = async () => {
    Op({ value: 2 }); // Sending value 2 to the backend
    navigate("/exit"); // Redirect to /exit path
  };

  const handleAnalyticsClick = async () => {
    navigate("/analytics"); // Redirect to /analytics path
  };

  return (
    <div className="login-container">
      <div className="blue-half">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
      </div>
      <div className="login-box">
        <h2>Select Operation</h2>
        <div className="button-container">
          <button className="login-button2" type="button" onClick={handleEntryClick}>
            Entry
          </button>
          <button className="login-button2" type="button" onClick={handleExitClick}>
            Issue
          </button>
          <button className="login-button2" type="button" onClick={handleAnalyticsClick}>
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
