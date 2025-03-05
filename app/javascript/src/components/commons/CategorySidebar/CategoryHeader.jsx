import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const CategoryHeader = ({ onAddClick }) => (
  <div className="flex items-center justify-between border-b p-4">
    <Typography style="h2">Categories</Typography>
    <Button icon={Plus} style="text" onClick={onAddClick} />
  </div>
);

CategoryHeader.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default CategoryHeader;
