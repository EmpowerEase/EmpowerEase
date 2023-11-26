"use client";
import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import axios from "axios";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const chartSetting = {
  yAxis: [
    {
      label: "Number of Tasks",
    },
  ],
  // width: 500,
  height: 410,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(0, 0)",
    },
  },
};

const valueFormatter = (value) => `${value} tasks`;

export default function TasksCompletionBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tasks/completion-stats"
        );
        if (response.data.stats && response.data.stats.length > 0) {
          const transformedData = response.data.stats.map((stat) => {
            const date = new Date(stat.date);
            const day = daysOfWeek[date.getDay()];
            return {
              day,
              completedOnTime: stat.completedOnTime,
              neededMoreTime: stat.neededMoreTime,
              completedEarly: stat.completedEarly,
            };
          });
          setData(transformedData);
          console.log(transformedData);
        } else {
          setData(getDefaultData());
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData(getDefaultData());
      }
    };

    fetchData();
  }, []);

  const getDefaultData = () => {
    return daysOfWeek.map((day) => ({
      day,
      completedOnTime: 8,
      neededMoreTime: 5,
      completedEarly: 6,
    }));
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "day" }]}
      series={[
        {
          // color: "#1B2845",

          color: "#6F73D2",

          dataKey: "completedOnTime",
          label: "OnTime",
          valueFormatter,
        },
        {
          // color: "#335C81",
          color: "#83C9F4",

          dataKey: "neededMoreTime",
          label: "MoreTime",
          valueFormatter,
        },
        {
          // color: "#65AFFF",
          color: "#A3D5FF",

          dataKey: "completedEarly",
          label: "Early",
          valueFormatter,
        },
      ]}
      {...chartSetting}
    />
  );
}
