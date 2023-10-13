import React, { useContext, useEffect } from "react";
import { QuantityFetch } from "./Actions/utils";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function QuantityIssue() {
  // Accessing state and functions from the global context using useContext
  const { 
    quantity, 
    setQuantity, 
    partQRCode 
  } = useContext(GlobalContext);

  // Prepare product data object with partQRCode
  const productData = {
    partQRCode: partQRCode,
  };

  // Function to handle quantity data retrieval
  const handleQuantitySearch = async () => {
    try {
      // Fetch quantity data using the QuantityFetch function and product data
      const quantityFetch = await QuantityFetch(productData);

      // Update quantity state if data is fetched successfully
      if (quantityFetch) {
        setQuantity(quantityFetch.quantity);
      }

    } catch (error) {
      console.error("Error fetching quantity data:", error);
    }
  };

  // Function to handle changes in the quantity input field
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Use useEffect to automatically trigger the quantity data retrieval when the partQRCode changes
  useEffect(() => {
    handleQuantitySearch();
  }, [partQRCode]);

  return (
    <div className="container">
      <h1>Quantity</h1>
      <div>
        <label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Quantity"
          />
        </label>
      </div>
    </div>
  );
}
