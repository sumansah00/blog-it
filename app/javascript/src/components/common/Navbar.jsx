import React, { useState } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="fixed left-4 top-4 z-40 rounded-md p-2 hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-30 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>
        {/* Sidebar Content */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                className="block rounded-md px-4 py-2 hover:bg-gray-100"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="block rounded-md px-4 py-2 hover:bg-gray-100"
                href="#"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="block rounded-md px-4 py-2 hover:bg-gray-100"
                href="#"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
