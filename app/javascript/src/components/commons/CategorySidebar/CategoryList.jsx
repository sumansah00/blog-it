import React from "react";

import { Typography, Button, Checkbox } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const CategoryList = ({
  categories,
  loading,
  selectedCategoryIds,
  toggleCategorySelection,
  clearAllSelections,
  hasSelectedCategories,
}) => (
  <div className="overflow-y-auto p-4">
    <div className="mb-4 flex items-center justify-between">
      <Typography style="h4">Filter by categories</Typography>
      {hasSelectedCategories && (
        <Button
          label="Clear All"
          size="small"
          style="text"
          onClick={clearAllSelections}
        />
      )}
    </div>
    {loading ? (
      <div className="py-4 text-center">
        <Typography>Loading categories...</Typography>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {categories.length > 0 ? (
          categories.map(category => (
            <div className="flex items-center" key={category.id}>
              <Checkbox
                checked={selectedCategoryIds.includes(category.id)}
                id={`category-${category.id}`}
                onChange={() => toggleCategorySelection(category.id)}
              />
              <label
                className="ml-2 w-full cursor-pointer"
                htmlFor={`category-${category.id}`}
              >
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <Typography className="py-4 text-center text-gray-500">
            No categories found
          </Typography>
        )}
      </div>
    )}
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedCategoryIds: PropTypes.array.isRequired,
  toggleCategorySelection: PropTypes.func.isRequired,
  clearAllSelections: PropTypes.func.isRequired,
  hasSelectedCategories: PropTypes.bool.isRequired,
};

export default CategoryList;
