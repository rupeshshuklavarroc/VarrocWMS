import React, { createContext, useState, useRef } from "react";

export const GlobalContext = createContext();

export const globalRefs = {
  locationInputRef: null,
  partInputRef: null,
  quantityInputRef: null,
};

export function GlobalProvider(props) {
  // State variables for product data
  const [data, setData] = useState({
    productFound: false,
    partUID: "",
    partSAPCode: "",
    quantity: "",
    category: "",
  });

  // State variables for location data
  const [data1, setData1] = useState({
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

  // State variable for user data
  const [data3, setData3] = useState({
    userFound: false,
    username: "",
    password: "",
  });

  // State variable for part QR code
  const [partQRCode, setPartQRCode] = useState("");

  // State variable for location code
  const [locationCode, setLocationCode] = useState("");

  // State variables for last product and location
  const [lastProduct, setLastProduct] = useState("");
  const [lastLocation, setLastLocation] = useState("");

  // Ref for part input
  const partInputRef = useRef(null);

  // State variables for location details
  const [plant, setPlant] = useState("Select Plant");
  const [shop, setShop] = useState("Select Shop");
  const [storageType, setStorageType] = useState("Select Storage Type");
  const [storageNo, setStorageNo] = useState("Select Storage No");
  const [storageSide, setStorageSide] = useState("Select Storage Side");
  const [storageRow, setStorageRow] = useState("Select Storage Row");
  const [clear, setClear] = useState(false);

  // State variable for quantity
  const [quantity, setQuantity] = useState("");

  // State varible for Date,Month and Year Filter
  const [selectedFilter, setSelectedFilter] = useState("Select Filter");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartMonth,setSelectedStartMonth]=useState(null);
  const [selectedEndMonth,setSelectedEndMonth]=useState(null);
  const [selectedStartYear,setSelectedStartYear]=useState(null);
  const [selectedEndYear,setSelectedEndYear]=useState(null);


  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        data1,
        setData1,
        globalRefs,
        partQRCode,
        setPartQRCode,
        locationCode,
        setLocationCode,
        partInputRef,
        data3,
        setData3,
        lastProduct,
        lastLocation,
        setLastProduct,
        setLastLocation,
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
        setStorageRow,
        clear,
        setClear,
        quantity,
        setQuantity,
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
        setSelectedEndYear
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
