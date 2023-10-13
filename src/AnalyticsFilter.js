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

export default function AnalyticsFilter() {
  const {
    selectedFilter, 
    setSelectedFilter,
    selectedStartDate, 
    setSelectedStartDate,
    selectedEndDate, 
    setSelectedEndDate,
    selectedStartMonth,
    setSelectedStartMonth,
    selectedEndMonth,
    setSelectedEndMonth,
    selectedStartYear,
    setSelectedStartYear,
    selectedEndYear,
    setSelectedEndYear} = useContext(GlobalContext);

  const dateFilter = () => {
    return (
      <div className="date-filter">
        <DatePicker
          selected={selectedStartDate}
          onChange={(date) => setSelectedStartDate(date)}
          dateFormat="dd/MM/yyyy"
          className="startDate"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
          dateFormat="dd/MM/yyyy"
          className="endDate"
          placeholderText="End Date"
          minDate={selectedStartDate}
        />
      </div>
    );
  };

  const monthFilter = ()=>{
    return(
        <div className="date-filter">
            <DatePicker
            selected={selectedStartMonth}
            onChange={(month)=>setSelectedStartMonth(month)}
            dateFormat="MM/yyyy"
            className="startDate"
            placeholderText="Start Month"
            showMonthYearPicker 
           />
           <DatePicker
           selected={selectedEndMonth}
           onChange={(month)=>setSelectedEndMonth(month)}
           dateFormat="MM/yyyy"
           className="endDate"
           placeholderText="End Month"
           minDate={selectedStartMonth}
           showMonthYearPicker
           />
        </div>
        );
  }

  const yearFilter = ()=>{
    return(
        <div className="date-filter">
            <DatePicker
            selected={selectedStartYear}
            onChange={(year)=>setSelectedStartYear(year)}
            dateFormat="yyyy"
            className="startDate"
            placeholderText="Start Year"
            showYearPicker
            />
            <DatePicker
            selected={selectedEndYear}
            onChange={(year)=>setSelectedEndYear(year)}
            dateFormat="yyyy"
            className="endDate"
            placeholderText="End Year"
            minDate={selectedStartYear}
            showYearPicker
            />
        </div>
    )
  }

  useEffect(() => {
    if (selectedFilter !== "Day Wise") {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
    if(selectedFilter !=="Monthly"){
        setSelectedStartMonth(null);
        setSelectedEndMonth(null);
    }
    if(selectedFilter!="Yearly"){
        setSelectedStartYear(null);
        setSelectedEndYear(null);
    }
  }, [selectedFilter]);


  return (
    <div>
      <div className="storage-type-filter-container">
        <FormControl className="storage-type-filter">
          <Select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <MenuItem value="Select Filter">Select Filter</MenuItem>
            <MenuItem value="Day Wise">Day Wise</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>

        {selectedFilter === "Day Wise" && dateFilter()}
        {selectedFilter === "Monthly" && monthFilter()}
        {selectedFilter === "Yearly" && yearFilter()}
      </div>
    </div>
  );
}
