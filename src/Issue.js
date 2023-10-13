import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductIssue from "./ProductIssue";
import QuantityIssue from "./QuantityIssue";
import LocationEntry from "./LocationEntry";
import IssueError from "./IssueError";
import DataDisplay from "./DataDisplay";
import LastIssue from "./LastIssue";
import { GlobalProvider } from "./Actions/GlobalContext";
import { Op } from "./Actions/utils";
import "./App.css";
import "./LoginPage.css";
import logo from './logo.png';
import menu from './menu.png';
import { Box, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout } from "@mui/icons-material";
import { WarehouseRounded } from "@mui/icons-material";
import { WarningAmberOutlined } from "@mui/icons-material";
import { Analytics } from "@mui/icons-material";
import { LiveHelpRounded } from "@mui/icons-material";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import InventoryIcon from '@mui/icons-material/Inventory';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeIcon from '@mui/icons-material/AddHome';

function Issue() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [state,setState]= useState({
    right: false
  })

  const toggleDrawer = (anchor,open)=>(event)=>{

    setState({...state,[anchor]:open});
  }

  // Handle click to open/close the menu
  const handleMenuClick = () => {
    setState({...state,right:false});
  };

  // Handle click on a menu item and navigate to the specified path
  const handleMenuItemClick = (path) => {
    navigate(path);
    setMenuOpen(false);
    setState({...state,right:false});
  };

  // Handle entry click (e.g., return to entry) and navigate to the /entry path
  const handleEntryClick = async () => {
    Op({ value: 1 }); // Sending value 1 to the backend
    navigate('/entry'); // Redirect to /entry path
    setMenuOpen(false);
    setState({...state,right:false});
  };

  const list = (anchor) => (
    <Box
    sx={{width: 300,
        marginRight:anchor === 'right' ? 0:'auto',
      }}
    role="presentation"
    onClick={toggleDrawer(anchor,false)}
    onKeyDown={toggleDrawer(anchor,false)}
    className={`drawer-container ${state[anchor] ? "drawer-open" : ""}`}>
      <List>
        <ListItemIcon>
          <CloseIcon onClick={()=>setState({...state,right:false})} style={{fontSize:"40px",color:"white",marginLeft:"250px"}}/>
        </ListItemIcon>
      </List>
      <List className="drawer-list" >
        {['Entry','Analytics','Live Status','Transaction Log','Stock Analysis','Log Out'].map((text,index)=>(
          <ListItem className="drawer-item"  key={text} disablePadding onClick={()=>{
            if(text==="Entry"){
              handleEntryClick();
              console.log(text)
            }else if(text==="Analytics"){
              handleMenuItemClick("/analytics");
            }else if(text==="Log Out"){
              handleMenuItemClick("/");
            }else if(text==="Live Status"){
              handleMenuItemClick("/live")
            }else if(text==="Transaction Log"){
              handleMenuItemClick("/history")
            }else if(text==="Stock Analysis"){
              handleMenuItemClick("/stocks")
            }
            toggleDrawer(anchor,false)();
          }}>
              <ListItemIcon>
                {index === 5 ? <PowerSettingsNewIcon style={{fontSize:"40px"}}/> :''}
                {index === 0 ? <AddHomeIcon style={{fontSize:"40px"}}/> :''}
                {index === 1 ? <AutoGraphIcon style={{fontSize:"40px"}}/> :''}
                {index===2 ? <ManageSearchIcon style={{fontSize:"40px"}}/>: ''}
                {index===3 ? <ContentPasteIcon style={{fontSize:"40px"}} />: ''}
                {index===4 ? <InventoryIcon style={{fontSize:"40px"}} />: ''}
          
      
                
              </ListItemIcon>
            <ListItemButton className="list-item-button"  >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

      </List>
    </Box>
  )


  return (
    <div className="App">
      <div className="header">
        <div className="header-content">
          <img src={logo} alt="HeaderLogo" className="header-logo" />
          <div className="headertitle">
            <p>WMS Issue</p>
          </div>
          <div className="menu-container">
            <div className="menu">
              <img
                src={menu}
                alt="Menu"
                className="header-logo"
                onClick={toggleDrawer("right",true)}
              />
              <div>
                  <React.Fragment key="right">
                    <Drawer
                    anchor="right"
                    open={state.right}
                    onClose={toggleDrawer("right",false)
                    }>
                      {list("right")}
                    </Drawer>
                  </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-container">
        <ProductIssue />
        <QuantityIssue />
        <LocationEntry />
      </div>
      <div>
        <IssueError />
      </div>
      <div>
        <DataDisplay />
      </div>
      <div>
        <LastIssue />
      </div>
    </div>
  );
}

// Wrap the Issue component with the GlobalProvider to provide global state
export default function IssueWithGlobalProvider() {
  return (
    <GlobalProvider>
      <Issue />
    </GlobalProvider>
  );
}
