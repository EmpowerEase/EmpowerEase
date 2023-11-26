"use client";
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WeekView from './weekview';



const Page = () => {

  return (
   <WeekView/>
  );
};

export default Page;
