import React from "react";

import { Search } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const CategorySearch = ({ searchTerm, onSearchChange }) => (
  <div className="p-4">
    <Input
      placeholder="Search categories"
      prefix={<Search />}
      value={searchTerm}
      onChange={e => onSearchChange(e.target.value)}
    />
  </div>
);

CategorySearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default CategorySearch;
