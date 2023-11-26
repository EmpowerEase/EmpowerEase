"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import WeekView from "./weekview";
import Navbar from "../Navbar/navbar";

const CalendarPage = () => {
  return (
    <div>
      {/* Your calendar page content goes here */}
      <Navbar />
      <WeekView />
    </div>
  );
};

export default CalendarPage;
