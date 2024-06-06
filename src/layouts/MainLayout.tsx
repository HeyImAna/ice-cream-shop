import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="px-4 mt-[86px] small:mt-[62px] mx-auto min-h-screen max-w-[1280px] font-sans text-gray-800">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
