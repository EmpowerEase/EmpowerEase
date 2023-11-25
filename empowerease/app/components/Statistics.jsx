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
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value) => `${value} tasks`;

export default function TasksCompletionBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/tasks/completion-stats");
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
      completedEarly: 4,
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
          dataKey: "completedOnTime",
          label: "OnTime",
          valueFormatter,
        },
        {
          dataKey: "neededMoreTime",
          label: "MoreTime",
          valueFormatter,
        },
        { dataKey: "completedEarly", label: "Early", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}