import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar
  } from "@mui/material";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import HomeIcon from '@mui/icons-material/Home';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 
  const Base = ({ children }) => {
    const navigate = useNavigate();
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={()=>navigate("/carts")} >
                <ShoppingCartIcon sx={{ color: "white", fontSize: "27px" }}/>
             </IconButton>
             <IconButton onClick={()=>navigate("/")}>
                <HomeIcon sx={{ color: "white", fontSize: "27px" }}/>
             </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <div>{children}</div>
      </div>
    );
  };
  
  export default Base;
  