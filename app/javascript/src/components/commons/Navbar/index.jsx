import React, { useState } from "react";

import { HamburgerMenu, Edit, Home, FilterAz } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory, Link } from "react-router-dom";

import CategorySidebar from "components/commons/CategorySidebar";
import { navLinks } from "constants/navbar";
import { getFromLocalStorage } from "utils/storage";

import NavLink from "./Links";

const Navbar = ({ children }) => {
  const history = useHistory();
  const userName = getFromLocalStorage("authUserName");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCategorySidebar = () => {
    setIsCategorySidebarOpen(!isCategorySidebarOpen);
  };

  const handleCategorySelect = categoryIds => {
    setSelectedCategoryIds(categoryIds);
    // Navigate to home with category filter
    const queryParams = new URLSearchParams();
    if (categoryIds.length > 0) {
      categoryIds.forEach(id => queryParams.append("category", id));
    }
    const queryString = queryParams.toString();
    history.push(`/${queryString ? `?${queryString}` : ""}`);
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

  const handleHomeClick = () => {
    setSelectedCategoryIds([]);
    history.push("/");
  };

  return (
    <div className="flex border-r-2 border-black">
      <div className="flex min-h-screen flex-col items-start gap-2 border-r-2 border-gray-200 p-2">
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={HamburgerMenu}
          style="primary"
          onClick={toggleSidebar}
        />
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={Home}
          style="tertiary"
          onClick={handleHomeClick}
        />
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={Edit}
          style="tertiary"
          onClick={handleEditClick}
        />
        <Button
          className="rounded-md p-2 hover:bg-gray-200"
          icon={FilterAz}
          style="tertiary"
          onClick={toggleCategorySidebar}
        />
        <Link className="flex items-center gap-x-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:shadow">
          <span className="block">{userName}</span>
        </Link>
      </div>
      {/* Main sidebar */}
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
      {/* Category sidebar */}
      <CategorySidebar
        isOpen={isCategorySidebarOpen}
        selectedCategoryIds={selectedCategoryIds}
        onCategorySelect={handleCategorySelect}
        onClose={toggleCategorySidebar}
      />{" "}
      <div className={mainContentClasses}>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
