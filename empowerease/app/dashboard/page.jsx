import React from "react";
import Profile from "../components/Profile";
import Statistics from "../components/Statistics";
import Goal from "../components/goal";
import Navbar from "../Navbar/navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CalendarPages = () => {
  return (
    // <>
    //   <Navbar />
    //   <Grid container spacing={2}>
    //     <Grid item xs={6}>
    //       <Goal />
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Profile />
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Statistics />
    //     </Grid>
    //   </Grid>
    // </>
    <>
      <Navbar />
      <Grid container className="bg-lightblue p-2" spacing={2}>
        {" "}
        {/* This adds padding around the entire grid */}
        <Grid item xs={12} md={6} className="flex">
          <div className="bg-white p-4 rounded shadow flex-grow">
            {" "}
            {/* Ensures full width */}
            <Goal />
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="flex">
          <div className="bg-white p-4 rounded shadow flex-grow">
            <Profile />
          </div>
        </Grid>
        <Grid item xs={12} className="flex mt-2 md:mt-0">
          {" "}
          {/* Adds top margin on mobile and resets it on medium screens and up */}
          <div className="bg-white p-6 rounded shadow w-full">
            {" "}
            {/* Ensures full width */}
            <Statistics />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CalendarPages;
