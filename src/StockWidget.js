// TransactionLogWidget.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./LoginPage.css";
import logo from "./stock.png";

const StockWidget = () => {
  return (
    <Link to="/stocks">
      <div className="widget stock-log-widget">
      <img src={logo} alt="StocksLogo" />
        <p>Stock Analytics</p>
      </div>
    </Link>
  );
};

export default StockWidget;
