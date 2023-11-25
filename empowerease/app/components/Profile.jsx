"use client";
import { useEffect, useState } from "react";

const Profile = () => {
  const [taskStatus, setTaskStatus] = useState(null);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await fetch("/api/profile/daily-task-status");
        const data = await response.json();
        setTaskStatus(data);
      } catch (error) {
        console.error("Error fetching task status:", error);
      }
    };

    fetchTaskStatus();
  }, []);

  return (
    <div>
      {taskStatus ? (
        <div>
          <h2>Profile</h2>
          <p>Date: {taskStatus.date}</p>
          <p>Tasks Completed Today: {taskStatus.tasksCompletedToday}</p>
          <p>Tasks Not Completed Today: {taskStatus.tasksNotCompletedToday}</p>
        </div>
      ) : (
        <p>Loading task status...</p>
      )}
    </div>
  );
};

export default Profile;
