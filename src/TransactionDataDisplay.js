import React, { useEffect, useState } from "react";
import { TranData } from "./Actions/utils";
import "./LoginPage.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  Grid,
  Container, // Add Container component from Material-UI
} from "@mui/material";

export default function TransactionDataDisplay() {
  // State variables for component
  const [tranData, setTranData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedLocationCode, setSelectedLocationCode] = useState("");
  const [isLocationCodeDropdownVisible, setLocationCodeDropdownVisible] = useState(false);
  const [sortByEntryDateTime, setSortByEntryDateTime] = useState(false);
  const [storageTypeFilter, setStorageTypeFilter] = useState("Select Storage");
  const [searchLocationCode, setSearchLocationCode] = useState("");

  // Fetch transaction data from the server
  const fetchTransactionData = async () => {
    try {
      let newData;
      newData = await TranData();
      setTranData(newData);
    } catch (error) {
      console.log("Error fetching the transaction data:", error);
    }
  };

  // Handle entries per page change
  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
  };

  // Handle location code selection
  const handleLocationCodeSelect = (e) => {
    setSelectedLocationCode(e.target.value);
  };

  // Toggle location code dropdown visibility
  const toggleLocationCodeDropdown = () => {
    setLocationCodeDropdownVisible(!isLocationCodeDropdownVisible);
  };

  // Sort data based on various criteria
  const sortData = (data) => {
    let sortedData = [...data];

    if (sortByEntryDateTime) {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.Date).getTime();
        const dateB = new Date(b.Date).getTime();
        return dateA - dateB;
      });
    }

    return sortedData;
  };

  // Filter data based on selected filters
  const filterData = (data) => {
    let filteredData = [...data];

    if (selectedLocationCode !== "") {
      filteredData = filteredData.filter((item) => item.LocationCode === selectedLocationCode);
    }

    if (storageTypeFilter !== "") {
      filteredData = filteredData.filter((item) => {
        if (storageTypeFilter === "Trolley") {
          return item.LocationCode.startsWith("T");
        } else if (storageTypeFilter === "Rack") {
          return item.LocationCode.startsWith("R");
        }
        return true;
      });
    }

    return filteredData;
  };

  // Filter data by location code search
  const filterByLocationCode = (data, searchValue) => {
    if (searchValue=== "") {
      return data;
    }
    return data.filter((item) => item.LocationCode.includes(searchValue));
  };

  const handleLocationCode = (e)=>{
    setSearchLocationCode(e.target.value);
    const data =filterByLocationCode(tranData,searchLocationCode);
    setTranData(data);
  }
  
  // Apply filtering and sorting to the data
  const filteredData = filterData(tranData);
  const sortedAndFilteredData = sortData(filteredData);

  // Fetch live data when clear or other dependencies change
  useEffect(() => {
    fetchTransactionData();
  }, []);

  // Update live data when location code search changes
  useEffect(()=>{
    const data =filterByLocationCode(tranData,searchLocationCode);
    setTranData(data);
  },[searchLocationCode])


  return (
    <div className="live_container2">
      <Container maxWidth="100%"> 
      <Grid container spacing={1}>
        <Grid item xs={12} conat>
          <div className="filter-container">
            <FormControl className="storage-type-filter">
              <Select
                value={storageTypeFilter}
                onChange={(e) => setStorageTypeFilter(e.target.value)}
              >
                <MenuItem value="Select Storage">Select Storage</MenuItem>
                <MenuItem value="Trolley">Trolley</MenuItem>
                <MenuItem value="Rack">Rack</MenuItem>
              </Select>
            </FormControl>
            <input
            className="inputloc"
            type="text"
            placeholder="Search Location Code"
            value={searchLocationCode}
            onChange={handleLocationCode}
          />
          </div>
        </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper} className="table-container" max-width="100%">
              <Table style={{ border: '2px solid black' }}>
                <TableHead style={{ border: '2px solid black' }}>
                  <TableRow>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>Location Code</span>
                        <div className="header-icons1">
                          <FormControl>
                            <Select
                              value={selectedLocationCode}
                              onChange={handleLocationCodeSelect}
                            >
                              <MenuItem value="">All</MenuItem>
                              {Array.from(new Set(tranData.map((item) => item.LocationCode))).map(
                                (code, index) => (
                                  <MenuItem key={index} value={code}>
                                    {code}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl> 
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-header"style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>PartQRCode</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>PartUID</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>PartSAPCode</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>Type Of Transaction</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>Quantity</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>DateTime</span>
                        <div className="header-icons">
                          <IconButton onClick={() => setSortByEntryDateTime(!sortByEntryDateTime)}>
                            {sortByEntryDateTime ? "⬆️" : "⬇️"}
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>UserID</span>
                      </div>
                    </TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody >
                  {sortedAndFilteredData.slice(0, entriesPerPage).map((item, index) => (
                    <TableRow key={index} style={{ border: '2px solid black' }}>
                      <TableCell style={{ border: '2px solid black' }}>{item.LocationCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartQRCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartUID}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartSAPCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.TypeOfTransaction}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.Quantity}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.Date}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.UserID}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="storage-type-filter">
              <Select
                value={entriesPerPage}
                onChange={(e) =>
                  handleEntriesPerPageChange(parseInt(e.target.value))
                }
              >
                <MenuItem value={10}>10 Entries</MenuItem>
                <MenuItem value={20}>20 Entries</MenuItem>
                <MenuItem value={50}>50 Entries</MenuItem>
                <MenuItem value={100}>100 Entries</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
