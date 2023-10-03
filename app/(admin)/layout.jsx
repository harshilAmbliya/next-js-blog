import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-6 h-screen overflow-y-scroll">
      <Sidebar />
      <div className="col-span-5 ">{children}</div>
    </div>
  );
};

export default layout;
