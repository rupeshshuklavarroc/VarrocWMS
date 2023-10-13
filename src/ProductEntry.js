import React, { useContext, useEffect } from "react";
import { fetchDataFromQR } from "./Actions/utils";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function ProductEntry() {
  // Retrieve state and functions from the global context
  const {
    data,
    setData,
    partQRCode,
    setPartQRCode,
    globalRefs,
    partInputRef,
  } = useContext(GlobalContext);

  // Function to handle the search for product data
  const handleProductSearch = async () => {
    try {
      // Prepare product data object
      const productData = { partQRCode };
      
      // Fetch product data using the utility function
      const fetchedProductData = await fetchDataFromQR(productData);
      
      // Update state with the fetched product data
      setData(fetchedProductData);

      // Focus on the quantity input field if available
      if (globalRefs.quantityInputRef) {
        globalRefs.quantityInputRef.focus();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  // Function to handle changes in the PartQRCode input field
  const handlePartQRCodeChange = (e) => {
    setPartQRCode(e.target.value);
  };

  // Use useEffect to focus on the input element when the component mounts
  useEffect(() => {
    if (partInputRef.current) {
      partInputRef.current.focus();
    }
  }, []);

  // Use useEffect to automatically trigger the search when the PartQRCode length reaches 21 characters
  useEffect(() => {
    if (partQRCode.length === 21) {
      handleProductSearch();
    }
  }, [partQRCode]);

  return (
    <div className="container2">
      <h1>Product Entry</h1>
      <div>
        <label>
          <input
            ref={partInputRef}
            type="text"
            name="part"
            value={partQRCode}
            onChange={handlePartQRCodeChange} // Use the handler for change event
            placeholder="PartQRCode"
          />
        </label>
      </div>
    </div>
  );
}
