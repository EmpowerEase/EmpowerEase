// components/Navbar.jsx
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EmpowerEnergize
        </Typography>
        <Link href="/dashboard" passHref>
          <Button color="inherit">Dashboard</Button>
        </Link>
        <Link href="/calendar" passHref>
          <Button color="inherit">Calendar</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
