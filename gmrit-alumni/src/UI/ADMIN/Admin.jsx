import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar'; // Sidebar component

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex">
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md lg:hidden overflow-x-hidden"
        onClick={toggleSidebar}
      >
        ☰ 
      </button>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 ml-0 lg:ml-[20vw] p-6 transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
