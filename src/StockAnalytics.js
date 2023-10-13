import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalProvider } from "./Actions/GlobalContext";
import AnalyticsFilter from "./AnalyticsFilter";
import Stock from "./Stock";
import { Op } from "./Actions/utils";
import "./App.css";
import "./LoginPage.css";
import logo from "./logo.png";
import menu from "./menu.png";
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
import { LiveHelpRounded } from "@mui/icons-material";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import InventoryIcon from '@mui/icons-material/Inventory';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeIcon from '@mui/icons-material/AddHome';


function StockAnalytics() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [state,setState]= useState({
    right: false
  })

  const toggleDrawer = (anchor,open)=>(event)=>{

    setState({...state,[anchor]:open});
  }


  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setState({...state,right:false});
  };

  const handleEntryClick = async () => {
    Op({ value: 1 }); // Sending value 1 to the backend
    navigate("/entry"); // Redirect to /entry path
    setState({...state,right:false});
  };

  const handleExitClick = async () => {
    Op({ value: 2 }); // Sending value 2 to the backend
    navigate("/exit"); // Redirect to /exit path
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
        {['Entry','Issue','Analytics','Live Status','Transaction Log','Log Out'].map((text,index)=>(
          <ListItem className="drawer-item"  key={text} disablePadding onClick={()=>{
            if(text==="Entry"){
              handleEntryClick();
              console.log(text)
            }else if(text==="Issue"){
              handleExitClick();
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
                {index === 1 ? <AdsClickIcon style={{fontSize:"40px"}}/> :''}
                {index===2 ? <AutoGraphIcon style={{fontSize:"40px"}}/>: ''}
                {index===3 ? <ManageSearchIcon style={{fontSize:"40px"}} />: ''}
                {index===4 ? <ContentPasteIcon style={{fontSize:"40px"}} />: ''}
          
      
                
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
            <p>Stock Analytics</p>
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
      <div >
        <AnalyticsFilter/>
      </div>
      <div>
      <Stock />
      </div>
    </div>
  );
}

export default function StockAnalyticsWithGlobalProvider() {
  return (
    <GlobalProvider>
      {/* Render the Analytics component wrapped with GlobalProvider */}
      <StockAnalytics />
    </GlobalProvider>
  );
}
