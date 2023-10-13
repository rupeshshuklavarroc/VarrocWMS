import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ProductEntry from "./ProductEntry";
import LocationEntry from "./LocationEntry";
import QuantityEntry from "./QuantityEntry";
import EntryError from "./EntryError";
import DataDisplay from "./DataDisplay";
import LastEntry from "./LastEntry";
import { Op } from "./Actions/utils";
import { GlobalProvider } from "./Actions/GlobalContext";
import "./App.css";
import "./LoginPage.css";
import { Box, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "./logo.png";
import menu from "./menu.png";
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
function Entry() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [state,setState]= useState({
    right: false
  })

  const toggleDrawer = (anchor,open)=>(event)=>{

    setState({...state,[anchor]:open});
  }

  // Handle click on a menu item and navigate to the specified path
  const handleMenuItemClick = (path) => {
    navigate(path);
    setState({...state,right:false});
  };

  // Handle exit click (e.g., issue) and navigate to the /exit path
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
        {['Issue','Analytics','Live Status','Transaction Log','Stock Analysis','Log Out'].map((text,index)=>(
          <ListItem className="drawer-item"  key={text} disablePadding onClick={()=>{
            if(text==="Issue"){
              handleExitClick();
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
                {index === 0 ? <AdsClickIcon style={{fontSize:"40px"}}/> :''}
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
            <p>WMS Entry</p>
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
        <ProductEntry />
        <QuantityEntry />
        <LocationEntry />
      </div>
      <div>
        <EntryError />
      </div>
      <div>
        <DataDisplay />
      </div>
      <div>
        <LastEntry />
      </div>
    </div>
  );
}

// Wrap the Entry component with the GlobalProvider to provide global state
export default function EntryWithGlobalProvider() {
  return (
    <GlobalProvider>
      <Entry />
    </GlobalProvider>
  );
}
