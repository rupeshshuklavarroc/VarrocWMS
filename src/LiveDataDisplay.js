import React, { useEffect, useState } from "react";
import { ComLive} from "./Actions/utils";
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
import TablePagination from "@mui/material/TablePagination";

export default function LiveDataDisplay() {

  // State variables for component
  const [liveData, setLiveData] = useState([]);
  const [page,setPage]= useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedLocationCode, setSelectedLocationCode] = useState("");
  const [isLocationCodeDropdownVisible, setLocationCodeDropdownVisible] = useState(false);
  const [sortByIsEmpty, setSortByIsEmpty] = useState(false);
  const [sortByEntryDateTime, setSortByEntryDateTime] = useState(false);
  const [storageTypeFilter, setStorageTypeFilter] = useState("Select Storage");
  const [searchLocationCode, setSearchLocationCode] = useState("");

  // Fetch live data from the server
  const fetchLiveData = async () => {
    try {
      let newData;
      newData = await ComLive();
      setLiveData(newData);
    } catch (error) {
      console.log("Error fetching the Live data:", error);
    }
  };

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  }

  // Handle entries per page change
  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value,10));
    setPage(0);
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

    if (sortByIsEmpty) {
      sortedData.sort((a, b) => (a.Isempty < b.Isempty ? -1 : 1));
    }

    if (sortByEntryDateTime) {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.EntryDateTime).getTime();
        const dateB = new Date(b.EntryDateTime).getTime();
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
  
  // Apply filtering and sorting to the data
  const filteredData = filterData(liveData);
  const sortedAndFilteredData = sortData(filteredData);

  const totalCount = sortedAndFilteredData.length;

  const paginatedData = sortedAndFilteredData.slice(
    page*entriesPerPage,
    (page+1)*entriesPerPage
  );

  // Fetch live data when clear or other dependencies change
  useEffect(() => {
    fetchLiveData();
  }, []);

  // Update live data when location code search changes
  useEffect(()=>{
    const data =filterByLocationCode(liveData,searchLocationCode);
    setLiveData(data);
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
            onInput={(e) => setSearchLocationCode(e.target.value)}
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
                              {Array.from(new Set(liveData.map((item) => item.LocationCode))).map(
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
                        <span>Isempty</span>
                        <div className="header-icons">
                          <IconButton onClick={() => setSortByIsEmpty(!sortByIsEmpty)}>
                            {sortByIsEmpty ? "⬆️" : "⬇️"}
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>EntryDateTime</span>
                        <div className="header-icons">
                          <IconButton onClick={() => setSortByEntryDateTime(!sortByEntryDateTime)}>
                            {sortByEntryDateTime ? "⬆️" : "⬇️"}
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>Quantity</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>User ID</span>
                      </div>
                    </TableCell>
                    <TableCell className="table-header" style={{ border: '2px solid black' }}>
                      <div className="header-content1">
                        <span>Last Modified</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {paginatedData.map((item, index) => (
                    <TableRow key={index} style={{ border: '2px solid black' }}>
                      <TableCell style={{ border: '2px solid black' }}>{item.LocationCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartQRCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartUID}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.PartSAPCode}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.Isempty}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.EntryDateTime}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.Quantity}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.UserID}</TableCell>
                      <TableCell style={{ border: '2px solid black' }}>{item.LastModified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            {/* <FormControl className="storage-type-filter">
              <Select
                value={entriesPerPage}
                onChange={(e) =>
                  handleEntriesPerPageChange(parseInt(e.target.value))
                }
              >
                <MenuItem value={10}>10 Entries</MenuItem>
                <MenuItem value={20}>20 Entries</MenuItem>
                <MenuItem value={50}>50 Entries</MenuItem>
                
              </Select>
            </FormControl> */}
            <TablePagination
                count={totalCount} 
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={entriesPerPage}
                onRowsPerPageChange={handleEntriesPerPageChange}
               />
                
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
