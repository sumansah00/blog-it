import React from "react";

import { Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const SidebarButton = ({ icon, onClick, primary = false }) => (
  <Button
    className="rounded-md p-2 hover:bg-gray-200"
    icon={icon}
    style={primary ? "primary" : "tertiary"}
    onClick={onClick}
  />
);

SidebarButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default SidebarButton;
