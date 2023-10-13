import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";

export default function IssueError() {
  // Accessing state and functions from the global context using useContext
  const {
    data,
    data1,
    setData,
    setData1,
    setPartQRCode,
    setLocationCode,
    partQRCode,
    locationCode,
    partInputRef,
    lastProduct,
    lastLocation,
    setLastProduct,
    setLastLocation
  } = useContext(GlobalContext);

  // Determine if there is an error
  const isError =
    data.productFound === false ||
    data1.locationFound === false ||
    data1.errorcode === 1 ||
    data1.errorcode === 2;

  // Determine if product details are incomplete
  const isProductDetailsIncomplete = partQRCode === "";
  // Determine if location details are incomplete
  const isLocationDetailsIncomplete =
    partQRCode !== "" && locationCode === "";

  // Set background and text color based on error and completion status
  let backgroundColor =
    isProductDetailsIncomplete || isLocationDetailsIncomplete
      ? "pink"
      : "red";
  let textColor =
    isProductDetailsIncomplete || isLocationDetailsIncomplete
      ? "black"
      : "white";

  // If there's no error, use green background
  if (!isError) {
    backgroundColor = "green";
  }

  // Styles for the error container
  const errorStyles = {
    background: backgroundColor,
    color: textColor,
  };

  // Function to reset input fields and data
  const handleReset = () => {
    setPartQRCode("");
    setLocationCode("");
    partInputRef.current.focus();
    setData({
      productFound: false,
      partUID: "",
      partSAPCode: "",
      quantity: "",
      category: "",
    });
    setData1({
      locationFound: false,
      plant: "",
      shop: "",
      storageType: "",
      storageNo: "",
      storageSide: "",
      storageRow: "",
      storageSlot: "",
      locationDesc: "",
      category: "",
    });

    // If there's no error, set the last product and location
    if (!isError) {
      setLastProduct(partQRCode);
      setLastLocation(locationCode);
    }
  };

  // useEffect to handle error reset timer
  useEffect(() => {
    if (isError) {
      const resetTimeout = setTimeout(() => {
        if (data1.errorcode === 1 || data1.errorcode === 2) {
          handleReset();
        }
      }, 5000);

      return () => {
        clearTimeout(resetTimeout);
      };
    }
  }, [isError, data1.errorcode]);

  // useEffect to handle success reset timer
  useEffect(() => {
    if (!isError) {
      const resetSuccessTimeout = setTimeout(() => {
        handleReset();
      }, 5000);

      return () => {
        clearTimeout(resetSuccessTimeout);
      };
    }
  }, [isError]);

  return (
    <div className="error" style={errorStyles}>
      {isProductDetailsIncomplete && (
        <h1 style={{ background: "pink", color: "black" }}>
          Enter Product Details
        </h1>
      )}
      {isLocationDetailsIncomplete && (
        <h1 style={{ background: "pink", color: "black" }}>
          Enter Location Details
        </h1>
      )}
      {isError ? (
        <>
          {data1.errorcode === 1 && (
            <>
              <h1>Location is empty</h1>
            </>
          )}
          {data1.errorcode === 2 && (
            <>
              <h1>Product is not present at the scanned location</h1>
            </>
          )}
        </>
      ) : (
        <div>
          <h1>Product removed successfully</h1>
        </div>
      )}
    </div>
  );
}
