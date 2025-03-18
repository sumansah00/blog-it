import React from "react";

import { ActionDropdown } from "@bigbinary/neetoui";
import { Column } from "neetoicons";
import { Checkbox } from "neetoui";

const ColumnFilterMenu = ({
  columnData,
  visibleColumns,
  handleToggleColumnVisibility,
}) => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = ActionDropdown;

  return (
    <ActionDropdown
      buttonStyle="secondary"
      dropdownProps={{ position: "bottom-end" }}
      icon={Column}
      label="Columns"
    >
      <Menu>
        {columnData
          .filter(column => column && column.key)
          .map(column => (
            <MenuItemButton className="p-2" key={column.key}>
              <Checkbox
                checked={visibleColumns[column.key]}
                disabled={column.key === "title"}
                id={`column-${column.key}`}
                label={column.title || column.key}
                onChange={() => handleToggleColumnVisibility(column.key)}
              />
            </MenuItemButton>
          ))}
      </Menu>
    </ActionDropdown>
  );
};

export default ColumnFilterMenu;
