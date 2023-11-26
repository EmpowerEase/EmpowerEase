// components/Navbar.jsx
"use client";
import React, {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Button, Grid} from "@mui/material";

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", color: "black", height: 80 }}
    >
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          EmpowerEnergize
        </Typography>
        <Link href="/dashboard" passHref prefetch={false}>
          <Button
            component="a"
            href="/dashboard"
            style={{
              backgroundColor:
                selectedButton === "dashboard" ? "#7174CA" : "transparent",
              color: selectedButton === "dashboard" ? "white" : "black",
            }}
            onClick={() => handleButtonClick("dashboard")}
          >
            Dashboard
          </Button>
        </Link>
        <Link href="/calendar" passHref prefetch={false}>
          <Button
            component="a"
            href="/calendar"
            style={{
              backgroundColor:
                selectedButton === "calendar" ? "#7174CA" : "transparent",
              color: selectedButton === "calendar" ? "white" : "black",
            }}
            onClick={() => handleButtonClick("calendar")}
          >
            Calendar
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
