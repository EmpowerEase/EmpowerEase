"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box } from "@mui/material";
import axios from "axios";

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

export async function getStaticProps() {
  try {
    const events = await axios.post("http://localhost:3000/api/events", {
      title: "Demo Data 2",
    });
    // Now you can pass these events to any function that needs them
    // For example, a hypothetical 'processEvents' function
    const processedEvents = processEvents(events[0]);

    return {
      props: {
        events: processedEvents,
      },
      // Add revalidation if needed
      revalidate: 10,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        events: [],
      },
    };
  }
}

const WeekView = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/events", {
        title: "Demo Data 2",
      });
      console.log(response.data.data);
      setEvents(response.data.data);
      // Promise.all(
      //   events.map((event) =>
      //     axios.post("http://localhost:3000/api/calls", {
      //       title: event.title,
      //       start: event.start,
      //       end: event.end,
      //     })
      //   )
      // )
      //   .then((responses) => {
      //     // Handle responses here
      //     // 'responses' is an array of all the responses from the axios.post calls
      //     console.log(responses);
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     console.error(error);
      //   });
      // Process the response data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
  };

  fetchData();

  useEffect(() => {}, []);

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
