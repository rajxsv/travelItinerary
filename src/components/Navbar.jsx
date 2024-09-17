// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-2 text-white  ">
      <div className="container flex justify-between items-center">
        <div className="text-xl flex justify-center items-center font-bold">
          <Link to="/">Atlan - Travel Itineraries based on user Preferences Submission by Rajpreet Singh</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;