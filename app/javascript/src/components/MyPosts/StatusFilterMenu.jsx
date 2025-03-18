import React from "react";

import { ActionDropdown } from "@bigbinary/neetoui";
import { Check } from "neetoicons";

const StatusFilterMenu = ({ label, options, onOptionClick }) => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = ActionDropdown;

  return (
    <ActionDropdown
      buttonStyle="secondary"
      dropdownProps={{ position: "bottom-end" }}
      icon={Check}
      label={label}
    >
      <Menu>
        {options.map(({ label, value }) => (
          <MenuItemButton key={value} onClick={() => onOptionClick(value)}>
            {label}
          </MenuItemButton>
        ))}
      </Menu>
    </ActionDropdown>
  );
};

export default StatusFilterMenu;
