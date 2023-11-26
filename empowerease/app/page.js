"use client";
import React, { useState } from "react";
import Pages from "./dashboard/page";
import Navbar from "./Navbar/navbar";
import CalendarPages from "./calendar/page";

const page = () => {
  let currentPage = "dashboard";
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (currentPage === "dashboard") {
    <Pages setIsSubmitted={setIsSubmitted} />;
  } else {
    <CalendarPages isSubmitted={isSubmitted} />;
  }
  return (
    <div>{currentPage === "dashboard" ? <Pages /> : <CalendarPages />}</div>
  );
};

export default page;
