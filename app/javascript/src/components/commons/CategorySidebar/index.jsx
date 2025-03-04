import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import PropTypes from "prop-types";

import categoriesApi from "apis/category";

import CategoryHeader from "./CategoryHeader";
import CategoryList from "./CategoryList";
import CategorySearch from "./CategorySearch";
import NewCategoryModal from "./NewCategoryModal";

const CategorySidebar = ({
  isOpen,
  onClose,
  onCategorySelect,
  selectedCategoryIds,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
    } catch (error) {
      Logger.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleAddCategory = async newCategoryName => {
    try {
      await categoriesApi.create({ name: newCategoryName.trim() });
      await fetchCategories();

      return true;
    } catch (error) {
      Logger.error("Failed to add category:", error);

      return false;
    }
  };

  const sidebarClasses = `fixed left-0 top-0 z-40 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
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
        <CategoryHeader onAddClick={() => setShowAddModal(true)} />
        <CategorySearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <CategoryList
          categories={filteredCategories}
          clearAllSelections={clearAllSelections}
          hasSelectedCategories={selectedCategoryIds.length > 0}
          loading={loading}
          selectedCategoryIds={selectedCategoryIds}
          toggleCategorySelection={toggleCategorySelection}
        />
      </div>
      <NewCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCategory}
      />
    </>
  );
};

CategorySidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CategorySidebar;
