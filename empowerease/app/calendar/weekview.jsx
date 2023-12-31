"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import axios from "axios";

const WeekView = () => {
  const [events, setEvents] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const fetchData = async () => {
    try {
      let titles = ["Read documents", "Fix bugs", "Do HR trainings", "break"];

      if (!uploaded) {
        await Promise.all(
          titles.map(async (eventTitle) => {
            const response = await axios.post(
              "http://localhost:3000/api/events",
              {
                title: eventTitle,
              }
            );

            // Append new events to the existing array
            setEvents((prevEvents) => [...prevEvents, ...response.data.data]);

            for (let event of response.data.data) {
              await axios.post("http://localhost:3000/api/events/test", {
                title: event.title,
                dateStart: event.start,
                dateEnd: event.end,
              });
            }
          })
        );

        setUploaded(true);
      }

      // Process the response data as needed
      // const google_response = axios.post(
      //   "http://localhost:3000/api/events/test",
      //   {
      //     title: "test",
      //     dateStart: "2023-11-25T00:00:00.000-05:00",
      //     dateEnd: "2023-11-26T23:59:00.000-05:00",
      //   }
      // );

      // if (!uploaded) {
      //   for (let i = 0; i < response.data.data.length; i++) {
      //     console.log("Im an event!");
      //     // events[i];
      //     await axios.post("http://localhost:3000/api/events/test", {
      //       title: response.data.data[i].title,
      //       dateStart: response.data.data[i].start,
      //       dateEnd: response.data.data[i].end,
      //     });
      //   }
      //   setUploaded(true);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle  error
    } finally {
      console.log("test");
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     fetchData();
  //   }
  //   // console.log("added");
  // }, []);

  useEffect(() => {
    if (!uploaded && refreshed) {
      fetchData();
      setRefreshed(false);
    }
    console.log();
  }, [refreshed]);

  return (
    <div className="max-w-screen-lg h-100% mx-auto p-4 overflow-hidden bg-blue-100">
      <button onClick={() => setRefreshed(true)}>Refresh</button>

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
