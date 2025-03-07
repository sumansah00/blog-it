import React, { useState } from "react";

import { HamburgerMenu, Edit, Home, FilterAz } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import CategorySidebar from "components/commons/CategorySidebar";
import { navLinks } from "constants/navbar";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import NavLink from "./Links";
import SidebarButton from "./SidebarButton";
import UserProfile from "./UserProfile";

const Navbar = ({ children }) => {
  const history = useHistory();
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const handleEditClick = () => history.push("/create");
  const handleHomeClick = () => {
    setSelectedCategoryIds([]);
    history.push("/");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCategorySidebar = () =>
    setIsCategorySidebarOpen(!isCategorySidebarOpen);

  const handleCategorySelect = categoryIds => {
    setSelectedCategoryIds(categoryIds);

    const queryParams = new URLSearchParams();
    if (categoryIds.length > 0) {
      categoryIds.forEach(id => queryParams.append("category", id));
    }
    const queryString = queryParams.toString();
    history.push(`/${queryString ? `?${queryString}` : ""}`);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  const sidebarClasses = classNames(
    "fixed left-0 top-0 z-30 h-full w-64 transform bg-white shadow-lg transition-transform duration-300",
    {
      "translate-x-0": isSidebarOpen,
      "-translate-x-full": !isSidebarOpen,
    }
  );

  const mainContentClasses = "transition-all duration-300 min-h-screen w-full";

  return (
    <div className="flex border-r-2 border-black">
      <div className="flex min-h-screen flex-col items-start gap-4 border-r-2 border-gray-200 p-2">
        <SidebarButton primary icon={HamburgerMenu} onClick={toggleSidebar} />
        <SidebarButton icon={Home} onClick={handleHomeClick} />
        <SidebarButton icon={Edit} onClick={handleEditClick} />
        <SidebarButton icon={FilterAz} onClick={toggleCategorySidebar} />
        <UserProfile
          userName={userName}
          {...{ userEmail }}
          onLogout={handleLogout}
        />
      </div>
      {/* Main navigation sidebar */}
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
      {/* Overlay for sidebar */}
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
      />
      {/* Main content area */}
      <div className={mainContentClasses}>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
