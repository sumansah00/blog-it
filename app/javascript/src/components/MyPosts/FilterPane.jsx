import React, { useState, useEffect } from "react";

import { Input, Select, Pane, Button } from "neetoui";

import categoriesApi from "apis/category";

const FilterPane = ({ isOpen, onClose, onApplyFilter }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    category_ids: [],
    status: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.fetch();
        setCategories(response.data.categories);
      } catch (error) {
        logger.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  const handleApplyFilter = () => {
    onApplyFilter(filters);
    onClose();
  };

  return (
    <Pane isOpen={isOpen} onClose={onClose}>
      <Pane.Header>
        <h2>Filter Posts</h2>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-6">
          <Input
            label="Title"
            placeholder="Search by title"
            value={filters.title}
            onChange={e =>
              setFilters(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Select
            isMulti
            label="Categories"
            placeholder="Select categories"
            options={categories.map(category => ({
              value: category.id,
              label: category.name,
            }))}
            value={categories
              .filter(category => filters.category_ids.includes(category.id))
              .map(category => ({
                value: category.id,
                label: category.name,
              }))}
            onChange={selectedOptions => {
              setFilters(prev => ({
                ...prev,
                category_ids: selectedOptions.map(option => option.value),
              }));
            }}
          />
          <Select
            label="Status"
            options={statusOptions}
            placeholder="Select status"
            value={statusOptions.find(
              option => option.value === filters.status
            )}
            onChange={option => {
              setFilters(prev => ({ ...prev, status: option?.value }));
            }}
          />
        </div>
      </Pane.Body>
      <Pane.Footer>
        <Button
          label="Clear"
          style="text"
          onClick={() =>
            setFilters({ title: "", category_ids: [], status: null })
          }
        />
        <Button label="Apply" onClick={handleApplyFilter} />
      </Pane.Footer>
    </Pane>
  );
};

export default FilterPane;
