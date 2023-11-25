
import React from "react";
import Profile from "../components/Profile";
import Statistics from "../components/Statistics";
import Goal from './Goal/goal';
import Navbar from '../Navbar/navbar';
import Break from './Break/break';


const Pages = () => {
  return (
    <div>

      <h1>Hello, Next.js!</h1>
      <Profile />
      <div className="w-full overflow-x-hidden">
        <Statistics />
     </div>
      <Navbar />
      <div>
        <Goal />
        <Break />

      </div>
    </div>
  );
};

export default Pages;
