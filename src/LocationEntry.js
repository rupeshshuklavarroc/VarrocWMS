import React, { useContext, useEffect, useRef } from "react";
import { fetchDataFromLocation } from "./Actions/utils";
import { GlobalContext } from "./Actions/GlobalContext";

export default function LocationEntry() {
  // Accessing state and functions from the global context using useContext
  const { 
    data1, 
    setData1, 
    globalRefs,
    locationCode,
    setLocationCode
  } = useContext(GlobalContext);
  
  // Create a ref for the location input element
  const locationInputRef = useRef();

  // Function to handle location data retrieval
  const handleLocationSearch = async () => {
    try {
      // Prepare location data object
      const locationData = { locationCode };
      
      // Fetch location data using the utility function
      const fetchedLocationData = await fetchDataFromLocation(locationData);
      
      // Update state with the fetched location data
      setData1(fetchedLocationData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Use useEffect to set the globalRefs.locationInputRef when the component mounts
  useEffect(() => {
    globalRefs.locationInputRef = locationInputRef.current;
  }, [globalRefs.locationInputRef]);

  // Use useEffect to automatically trigger the search when the locationCode changes
  useEffect(() => {
    if (locationCode.trim() !== "") {
      handleLocationSearch();
    }
  }, [locationCode]);

  return (
    <div className="container1">
      <h1>Location Entry</h1>
      <div>
        <label>
          <input
            ref={locationInputRef}
            type="text"
            name="location"
            value={locationCode}
            onChange={(e) => setLocationCode(e.target.value)}
            placeholder="Location Code"
          />
        </label>
      </div>
    </div>
  );
}
