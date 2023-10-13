import React, { useContext, useEffect, useRef } from "react";
import { Quantity } from "./Actions/utils";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function QuantityEntry() {
  // Accessing state and functions from the global context using useContext
  const {
    globalRefs,
    quantity,
    setQuantity
  } = useContext(GlobalContext);

  // Create a ref for the quantity input element
  const quantityInputRef = useRef();

  // Function to handle quantity data input
  const handleQuantityInput = async () => {
    try {
      // Prepare quantity data object
      const quantityData = { quantity };

      // Call the Quantity function with quantity data
      Quantity(quantityData);

      // Focus on the location input field if available
      if (globalRefs.locationInputRef) {
        globalRefs.locationInputRef.focus();
      }
    } catch (error) {
      console.error("Error posting quantity data:", error);
    }
  };

  // Function to handle changes in the quantity input field
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Use useEffect to set the globalRefs.quantityInputRef when the component mounts
  useEffect(() => {
    globalRefs.quantityInputRef = quantityInputRef.current;
  }, [globalRefs.quantityInputRef]);

  // Use useEffect to automatically trigger the input handling when the quantity length reaches 4 characters
  useEffect(() => {
    if (quantity.length === 4) {
      handleQuantityInput();
    }
  }, [quantity]);

  return (
    <div className="container">
      <h1>Quantity</h1>
      <div>
        <label>
          <input
            ref={quantityInputRef}
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange} // Use the handler for change event
            placeholder="Quantity"
          />
        </label>
      </div>
    </div>
  );
}
