import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

const NavLink = ({ text, to, toggleSidebar }) => (
  <Link
    className="block rounded-md px-4 py-2 hover:bg-gray-100"
    to={to}
    onClick={toggleSidebar}
  >
    <Typography>{text}</Typography>
  </Link>
);

export default NavLink;
