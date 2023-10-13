import React, { useContext } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function LastEntry() {
  // Accessing the last product and location from the global context using useContext
  const { lastProduct, lastLocation } = useContext(GlobalContext);

  return (
    <div className="subcontainer">
      <center>
        {/* Display the last entered product and location */}
        <h1 className="centered-text">
          Last, {lastProduct} was entered at {lastLocation}
        </h1>
      </center>
    </div>
  );
}
