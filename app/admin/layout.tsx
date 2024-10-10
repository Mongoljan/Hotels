'use client';
import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this runs only on the client-side after the component has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  if (!isMounted) {
    // Prevent hydration errors by returning null until the client renders the component
    return null;
  }

  return (
    <html lang="en">
      <body>
        {/* Topbar with the new button to toggle sidebar */}
        <Topbar toggleSidebar={toggleSidebar} sideBarOpen={isSidebarVisible} />
        
        <div className="relative">
          {/* Sidebar overlay */}
          {isSidebarVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
          )}
          
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out transform ${
              isSidebarVisible ? "translate-x-0" : "-translate-x-full"
            } w-80 h-screen bg-gray-100 shadow-lg`}
          >
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
