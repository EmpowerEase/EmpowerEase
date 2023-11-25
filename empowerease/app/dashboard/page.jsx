import React from 'react';
// import Navbar from '../Navbar/navbar';
import Goal from './Goal/goal';
import Navbar from '../Navbar/navbar';
import Break from './Break/break';

const Pages = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Goal />
        <Break />
      </div>
    </div>
  );
};

export default Pages;