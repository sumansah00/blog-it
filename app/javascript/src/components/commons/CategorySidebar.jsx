import React, { useState, useEffect } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Typography, Button, Input, Checkbox } from "@bigbinary/neetoui";
import Logger from "js-logger";
import PropTypes from "prop-types";

import categoriesApi from "apis/category";

const CategorySidebar = ({
  isOpen,
  onClose,
  onCategorySelect,
  selectedCategoryIds,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.fetch();
      setCategories(response.data.categories);
    } catch (error) {
      Logger.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setAddingCategory(true);
      await categoriesApi.create({ name: newCategoryName.trim() });
      setNewCategoryName("");
      setShowAddForm(false);
      await fetchCategories();
    } catch (error) {
      Logger.error("Failed to add category:", error);
    } finally {
      setAddingCategory(false);
    }
  };

  const toggleCategorySelection = categoryId => {
    if (selectedCategoryIds.includes(categoryId)) {
      onCategorySelect(selectedCategoryIds.filter(id => id !== categoryId));
    } else {
      onCategorySelect([...selectedCategoryIds, categoryId]);
    }
  };

  const clearAllSelections = () => {
    onCategorySelect([]);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarClasses = `fixed right-0 top-0 z-40 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between border-b p-4">
          <Typography style="h2">Categories</Typography>
          <Button
            icon={Plus}
            style="text"
            onClick={() => setShowAddForm(!showAddForm)}
          />
        </div>
        <div className="p-4">
          <Input
            placeholder="Search categories"
            prefix={<Search />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        {showAddForm && (
          <div className="border-b border-t p-4">
            <div className="flex flex-col gap-2">
              <Input
                label="New Category"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  label="Cancel"
                  style="text"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCategoryName("");
                  }}
                />
                <Button
                  label="Add"
                  loading={addingCategory}
                  onClick={handleAddCategory}
                />
              </div>
            </div>
          </div>
        )}
        <div className="overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <Typography style="h4">Filter by categories</Typography>
            {selectedCategoryIds.length > 0 && (
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
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
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
      </div>
    </>
  );
};

CategorySidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategoryIds: PropTypes.arrayOf(PropTypes.number),
};

CategorySidebar.defaultProps = {
  selectedCategoryIds: [],
};

export default CategorySidebar;
