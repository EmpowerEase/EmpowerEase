"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import axios from "axios";
// import { updateEvents } from "./googlecalls";

//const TIMEOFFSET = '-05:00';

// const event = [
//   {
//     title: "Demo Data 1",
//     start: "2023-11-25T08:30:00-05:00",
//     end: "2023-11-25T09:30:00-05:00",
//   },
//   {
//     title: "Demo Data 2",
//     start: "2023-11-26T10:00:00-05:00",
//     end: "2023-11-26T11:30:00-05:00",
//   },
// ];

const WeekView = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/events", {
        title: "Demo Data 2",
      });
      console.log(response.data.data);
      setEvents(response.data.data);
      // Process the response data as needed
      // const google_response = axios.post(
      //   "http://localhost:3000/api/events/test",
      //   {
      //     title: "test",
      //     dateStart: "2023-11-25T00:00:00.000-05:00",
      //     dateEnd: "2023-11-26T23:59:00.000-05:00",
      //   }
      // );
      // Promise.all(
      //   events.map((event) =>
      //     axios.post("http://localhost:3000/api/events/test", {
      //       title: event.title,
      //       dateStart: event.start,
      //       dateEnd: event.end,
      //     })
      //   )
      // )
      //   .then((responses) => {
      //     // Handle responses here
      //     // 'responses' is an array of all the responses from the axios.post calls
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     console.error(error);
      //   });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle  error
    } finally {
      console.log("test");
    }
  };

  fetchData();

  //useEffect(() => {}, []);

  return (
    <div className="max-w-screen-lg h-100% mx-auto p-4 overflow-hidden bg-blue-100">
      <Box sx={{ bgcolor: "white" }}>
        <FullCalendar
          style={{ maxHeight: "100%" }}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          events={events}
          slotDuration="00:30:00" // Set the duration of each slot to 15 minutes
          slotLabelInterval="01:00:00" // Display time labels every hour
          allDaySlot={false}
          views={{
            timeGridWeek: {
              scrollTime: "07:00:00", // Set the initial scroll time to 8:00 AM for timeGridWeek view
            },
          }}
        />
      </Box>
    </div>
  );
};

export default WeekView;
