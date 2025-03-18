import React from "react";

import { Filter } from "neetoicons";
import { Typography, Button } from "neetoui";

import ColumnFilterMenu from "./ColumnFilterMenu";

const Header = ({
  postsCount,
  columnData,
  visibleColumns,
  handleToggleColumnVisibility,
  handleOpenFilterPane,
}) => (
  <div className="mb-6 flex items-center justify-between">
    <div>
      <Typography style="h1">My Posts</Typography>
      <Typography style="body2" weight="bold">
        {postsCount} articles
      </Typography>
    </div>
    <div>
      <ColumnFilterMenu
        columnData={columnData}
        handleToggleColumnVisibility={handleToggleColumnVisibility}
        visibleColumns={visibleColumns}
      />
      <Button icon={Filter} style="tertiary" onClick={handleOpenFilterPane} />
    </div>
  </div>
);

export default Header;
