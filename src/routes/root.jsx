import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="flex flex-col max-h-fit">
        <Navbar />
        <Outlet />
    </div>
  );
};

export default Root;
