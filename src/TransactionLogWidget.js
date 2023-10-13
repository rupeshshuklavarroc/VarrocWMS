// TransactionLogWidget.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./LoginPage.css";
import logo from "./transaction.png";

const TransactionLogWidget = () => {
  return (
    <Link to="/history">
      <div className="widget transaction-log-widget">
      <img src={logo} alt="HistoryLogo" />
        <p>Transaction Log</p>
      </div>
    </Link>
  );
};

export default TransactionLogWidget;
