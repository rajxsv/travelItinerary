// src/routes/root.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
    </div>
  );
};

export default Root;
