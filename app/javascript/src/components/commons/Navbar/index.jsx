import React, { useState } from "react";

import { HamburgerMenu, Edit } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import { navLinks } from "constants/navbar";

import NavLink from "./Links";

const Navbar = ({ children }) => {
  const history = useHistory();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClasses = classNames(
    "fixed left-0 top-0 z-30 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
    {
      "translate-x-0": isSidebarOpen,
      "-translate-x-full": !isSidebarOpen,
    }
  );

  const mainContentClasses = classNames(
    "transition-all duration-300 ease-in-out min-h-screen w-full"
  );

  const handleEditClick = () => {
    history.push("/create");
  };

  return (
    <div className="flex border-r-2 border-black">
      <div className=" flex min-h-screen flex-col items-start gap-2 border-r-2 border-gray-200 p-2">
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={HamburgerMenu}
          style="tertiary"
          onClick={toggleSidebar}
        />
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={Edit}
          style="tertiary"
          onClick={handleEditClick}
        />
      </div>
      <div className={sidebarClasses}>
        <div className="border-b p-4">
          <Typography style="h2">Menu</Typography>
        </div>
        <nav className="space-y-2 p-4">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              text={link.text}
              to={link.to}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </nav>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
      <div className={mainContentClasses}>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
