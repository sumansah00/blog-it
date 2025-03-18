import React from "react";

import { Filter, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

import ColumnFilterMenu from "./ColumnFilterMenu";
import StatusFilterMenu from "./StatusFilterMenu";

const Header = ({
  postsCount,
  columnData,
  visibleColumns,
  handleToggleColumnVisibility,
  handleOpenFilterPane,
  selectedRows = [],
  onStatusChange,
  onBulkDelete,
}) => (
  <div className="mb-6 flex items-center justify-between">
    <div>
      <Typography style="h1">My Posts</Typography>
      <Typography style="body2" weight="bold">
        {postsCount} articles
      </Typography>
    </div>
    <div className="flex items-center space-x-2">
      {selectedRows.length > 0 ? (
        <>
          <StatusFilterMenu
            label="Change Status"
            options={[
              { label: "Draft", value: "draft" },
              { label: "Publish", value: "published" },
            ]}
            onOptionClick={status => onStatusChange(selectedRows, status)}
          />
          <Button
            icon={Delete}
            style="danger"
            onClick={() => onBulkDelete(selectedRows)}
          />
        </>
      ) : (
        <>
          <ColumnFilterMenu
            columnData={columnData}
            handleToggleColumnVisibility={handleToggleColumnVisibility}
            label="Columns"
            visibleColumns={visibleColumns}
          />
          <Button
            icon={Filter}
            style="tertiary"
            onClick={handleOpenFilterPane}
          />
        </>
      )}
    </div>
  </div>
);

export default Header;
