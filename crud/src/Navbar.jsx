import React from "react";
import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
function Navbar() {
  const liskcss = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "5px",
    cursor:'pointer'
  };
  return (
    <AppBar>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{ width:{md:"20%",xs:"40%"} }}>
          <h2 style={{marginLeft:"10px"}}>Goal Form </h2>
        </Box>
        <Box sx={{width:{md:"80%",xs:"60%"} }}>
          <Link to="/" style={liskcss}>
            Home
          </Link>
          <Link to="/sinup" style={liskcss}>
            Signup
          </Link>
          <Link to="/login" style={liskcss}>
            Login
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
}

export default Navbar;
