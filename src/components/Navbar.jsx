// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 rounded-3xl m-5 text-white z-10 absolute">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Atlan - Travel Itineraries based on user Preferences Submission by Rajpreet Singh</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;