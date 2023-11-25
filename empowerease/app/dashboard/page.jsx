import React from "react";
import Profile from "../components/Profile";
import Statistics from "../components/Statistics";

const Pages = () => {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Profile />
      <div className="w-full overflow-x-hidden">
        <Statistics />
      </div>
    </div>
  );
};

export default Pages;
