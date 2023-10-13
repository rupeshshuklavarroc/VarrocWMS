import React, { useContext } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function DataDisplay() {
  // Accessing data and setData functions from the global context using useContext
  const { 
    data, 
    data1, 
    setData, 
    setData1 
  } = useContext(GlobalContext);

  return (
    <div>
      <div className="subcontainer">
        {/* Display product details if productFound is true */}
        <div>
          {data.productFound ? (
            <>
              <h2>Product Details:</h2>
              <p>Part UID: {data.partUID}</p>
              <p>Part SAP Code: {data.partSAPCode}</p>
              <p>Quantity: {data.quantity}</p>
              <p>Category: {data.category}</p>
            </>
          ) : (
            <p>No product found with the given Part QR Code</p>
          )}
        </div>

        {/* Display location details if locationFound is true */}
        <div>
          {data1.locationFound ? (
            <>
              <h2>Location Details:</h2>
              <p>Plant: {data1.plant}</p>
              <p>Shop: {data1.shop}</p>
              <p>Storage Type: {data1.storageType}</p>
              <p>Storage No: {data1.storageNo}</p>
              <p>Storage Side: {data1.storageSide}</p>
              <p>Storage Row: {data1.storageRow}</p>
              <p>Storage Slot: {data1.storageSlot}</p>
              <p>Location Description: {data1.locationDesc}</p>
              <p>Category: {data1.category}</p>
            </>
          ) : (
            <p>No location found with the given Location Code</p>
          )}
        </div>
      </div>
    </div>
  );
}
