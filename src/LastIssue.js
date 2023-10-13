import React, { useContext } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function LastIssue() {
  // Accessing the lastProduct and lastLocation from the global context using useContext
  const { lastProduct, lastLocation } = useContext(GlobalContext);

  return (
    <div className="subcontainer">
      <center>
        {/* Display the last removed product and location */}
        <h1 className="centered-text">
          Last, {lastProduct} was removed from {lastLocation}
        </h1>
      </center>
    </div>
  );
}
