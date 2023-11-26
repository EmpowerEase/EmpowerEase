"use client";
// import { useEffect, useState } from "react";

import Break from "../components/break";
import React from "react";
import { Avatar, Box, Paper, Typography, Grid } from "@mui/material";

const ProfileAvatar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "270px",
        background: "linear-gradient(to bottom, #6F73D2, #9ECCF1)", // Blue gradient background
        color: "white",
      }}
    >
      <Avatar
        alt="Jenna Smith"
        src="../asset/profilePicture.jpg"
        sx={{
          width: 50,
          height: 50,
          marginBottom: 2,
          marginTop: 2,
          backgroundColor: "#A2D5FF",
        }}
      />

      <Typography variant="h6">Jenna Smith</Typography>
      {/* Add any additional user information or actions */}

      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          marginTop: "2px",
          justifyContent: "center",
        }}
      >
        <Typography variant="h10">Tasks completed</Typography>
        <progress
          className="progress progress-accent w-56"
          value="40"
          max="100"
          sx={{ width: "150px", height: "8px" }}
        ></progress>
        <span className="text-white text-sm">5/10</span>
      </Grid>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          marginTop: "2px",
        }}
      >
      </div> */}

      <Grid item xs={3} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Break />
      </Grid>
    </Paper>
  );
};

export default ProfileAvatar;
