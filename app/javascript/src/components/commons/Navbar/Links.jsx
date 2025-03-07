import React from "react";

import { Typography } from "@bigbinary/neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavLink = ({ text, to, toggleSidebar }) => (
  <Link
    className="block rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
    to={to}
    onClick={toggleSidebar}
  >
    <Typography>{text}</Typography>
  </Link>
);

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavLink;
