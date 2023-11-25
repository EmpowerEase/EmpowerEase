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

  // Function to calculate the width of the progress bar
  const calculateProgressWidth = () => {
    const totalTasks =
      taskStatus.tasksCompletedToday + taskStatus.tasksNotCompletedToday;
    return (taskStatus.tasksCompletedToday / totalTasks) * 100;
  };

  return (
    // <div className="p-4">
    //   {taskStatus ? (
    //     <div>
    //       <h2 className="text-lg font-semibold">Profile</h2>
    //       <p>Date: {taskStatus.date}</p>
    //       <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
    //         <div
    //           className="bg-green-500 h-4 rounded-full"
    //           style={{ width: `${calculateProgressWidth()}%` }}
    //         ></div>
    //       </div>
    //       <div className="flex justify-between text-sm mt-2">
    //         <p>Tasks Completed: {taskStatus.tasksCompletedToday}</p>
    //         <p>Tasks Not Completed: {taskStatus.tasksNotCompletedToday}</p>
    //       </div>
    //     </div>
    //   ) : (
    //     <p>Loading task status...</p>
    //   )}
    // </div>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">EmpowerEase</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div>
            <progress
              className="progress progress-accent w-56"
              value="40"
              max="100"
            ></progress>
            <span className="text-white text-sm">5/10</span>
          </div>
          <div>
            <progress
              className="progress progress-accent w-56"
              value="70"
              max="100"
            ></progress>
            <span className="text-white text-sm">7/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
