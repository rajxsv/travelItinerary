// src/routes/root.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='flex justify-center' >
        <Navbar />
      </div>
      <main className="flex-grow">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Root;
