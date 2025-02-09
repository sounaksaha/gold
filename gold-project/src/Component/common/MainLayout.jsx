import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area - Resizes Instead of Overlaying */}
      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Content (Outlet + Footer) */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 bg-gray-200">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
