import React, { useContext, useState, useEffect } from "react";
import { Params } from "./Actions/utils";
import { GlobalContext } from "./Actions/GlobalContext";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

export default function Live() {
  const { plant, setPlant, shop, setShop, storageType, setStorageType, storageNo, setStorageNo, storageSide, setStorageSide, storageRow, setStorageRow, clear, setClear } = useContext(GlobalContext);

  const [plantSelect, setPlantSelect] = useState([]);
  const [shopSelect, setShopSelect] = useState([]);
  const [storageTypeSelect, setStorageTypeSelect] = useState([]);
  const [storageNoSelect, setStorageNoSelect] = useState([]);
  const [storageSideSelect, setStorageSideSelect] = useState([]);
  const [storageRowSelect, setStorageRowSelect] = useState([]);

  const handleFilter = async () => {
    if (plant !== "" || shop !== "" || storageType !== "" || storageNo !== "" || storageSide !== "" || storageRow !== "") {
      setClear(true);
    } 
    else {
      setClear(false);
    }
  };

  const handleclear = async () => {
    setPlant("Select Plant");
    setShop("Select Shop");
    setStorageType("Select Storage Type");
    setStorageNo("Select Storage No");
    setStorageSide("Select Storage Side");
    setStorageRow("Select Storage Row");
    setClear(false);
  };

  const handleSelect = async () => {
    try {
      const paramData = await Params();
      if (paramData) {
        const uniquePlants = [...new Set(paramData.map((item) => item.Plant))];
        const uniqueShops = [...new Set(paramData.map((item) => item.Shop))];
        const uniqueStorageTypes = [...new Set(paramData.map((item) => item.StorageType))];
        const uniqueStorageNos = [...new Set(paramData.map((item) => item.StorageNo))];
        const uniqueStorageSides = [...new Set(paramData.map((item) => item.StorageSide))];
        const uniqueStorageRows = [...new Set(paramData.map((item) => item.StorageRow))];

        setPlantSelect(uniquePlants || []);
        setShopSelect(uniqueShops || []);
        setStorageTypeSelect(uniqueStorageTypes || []);
        setStorageNoSelect(uniqueStorageNos || []);
        setStorageSideSelect(uniqueStorageSides || []);
        setStorageRowSelect(uniqueStorageRows || []);
      } else {
        console.log("Data not in proper format");
      }
    } catch (error) {
      console.log("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    handleSelect();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [plant, shop, storageType, storageNo, storageSide, storageRow]);

  return (
    <div className="live_container">
      <div className="filter-container2">
        <FormControl>
          <Select
            name="plant"
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
          >
            <MenuItem value="Select Plant">Select Plant</MenuItem>
            {plantSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            name="shop"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
          >
            <MenuItem value="Select Shop">Select Shop</MenuItem>
            {shopSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            name="storageType"
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
          >
            <MenuItem value="Select Storage Type">Select Storage Type</MenuItem>
            {storageTypeSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            name="storageNo"
            value={storageNo}
            onChange={(e) => setStorageNo(e.target.value)}
          >
            <MenuItem value="Select Storage No">Select Storage No</MenuItem>
            {storageNoSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            name="storageSide"
            value={storageSide}
            onChange={(e) => setStorageSide(e.target.value)}
          >
            <MenuItem value="Select Storage Side">Select Storage Side</MenuItem>
            {storageSideSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            name="storageRow"
            value={storageRow}
            onChange={(e) => setStorageRow(e.target.value)}
          >
            <MenuItem value="Select Storage Row">Select Storage Row</MenuItem>
            {storageRowSelect.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button className="login-button2" variant="outlined" type="button" onClick={handleclear}>
          Clear
        </button>
      </div>
    </div>
  );
}
