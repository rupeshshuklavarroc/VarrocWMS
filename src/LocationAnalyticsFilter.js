import React, { useEffect} from "react";
import { GlobalContext } from "./Actions/GlobalContext";
import "./LoginPage.css";
import {
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";

export default function LocationAnalyticsFilter() {
  const {
    selectedFilter, 
    setSelectedFilter,
    plant, 
    setPlant,
    shop, 
    setShop,
    storageType, 
    setStorageType,
    storageNo, 
    setStorageNo,
    storageSide, 
    setStorageSide,
    storageRow, 
    setStorageRow} = useContext(GlobalContext);

  

  useEffect(() => {
    
  }, [selectedFilter]);


  return (
    <div>
      <div className="storage-type-filter-container">
        <FormControl className="storage-type-filter">
          <Select
            value={plant}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <MenuItem value="Select Filter">Select Filter</MenuItem>
            <MenuItem value="Day Wise">Day Wise</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        
      </div>
    </div>
  );
}
