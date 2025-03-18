import React, { useState } from "react";

import { Table } from "neetoui";
import { isNotEmpty } from "ramda";
import { useHistory } from "react-router-dom";

import postsApi from "apis/post";

import FilterPane from "./FilterPane";
import PostsHeader from "./Header";
import { getColumnConfig } from "./tableConfig";

import usePostsManager from "../../hooks/usePostsManager";

const MyPosts = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const history = useHistory();
  const {
    posts,
    loading,
    visibleColumns,
    setVisibleColumns,
    fetchPosts,
    handleDelete,
    handleStatusUpdate,
  } = usePostsManager();

  const handleToggleColumnVisibility = columnKey => {
    if (columnKey === "title") return;

    setVisibleColumns(prev => {
      const newVisibleColumns = {
        ...prev,
        [columnKey]: !prev[columnKey],
      };
      fetchPosts(newVisibleColumns);

      return newVisibleColumns;
    });
  };

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRowKeys);
    // You can also access the full selected row data from selectedRows parameter
    logger.info("Selected rows:", selectedRows);
  };

  const handleBulkStatusChange = async (selectedIds, newStatus) => {
    try {
      await postsApi.bulkUpdateStatus(selectedIds, newStatus);
      setSelectedRows([]);
      fetchPosts(visibleColumns);
    } catch (error) {
      logger.error("Error updating status:", error);
    }
  };

  const handleBulkDelete = async selectedIds => {
    try {
      await postsApi.bulkDelete(selectedIds);
      setSelectedRows([]);
      fetchPosts(visibleColumns);
    } catch (error) {
      logger.error("Error deleting posts:", error);
    }
  };

  const columnData = getColumnConfig({
    visibleColumns,
    onNavigate: slug => history.push(`/posts/${slug}/show`),
    onDelete: handleDelete,
    onPublish: slug => handleStatusUpdate(slug, "published"),
    onUnpublish: slug => handleStatusUpdate(slug, "draft"),
  });

  return (
    <div className="max-w-full overflow-auto">
      <PostsHeader
        columnData={columnData}
        handleOpenFilterPane={() => setIsFilterPaneOpen(true)}
        handleToggleColumnVisibility={handleToggleColumnVisibility}
        selectedRows={selectedRows} // Changed from selectedRowsCount
        visibleColumns={visibleColumns}
        postsCount={
          isNotEmpty(selectedRows) ? selectedRows.length : posts.length
        }
        onBulkDelete={handleBulkDelete} // Add this
        onStatusChange={handleBulkStatusChange} // Add this
      />
      <Table
        bordered
        enableColumnResize
        rowSelection
        columnData={columnData.filter(column => column && !column.hidden)}
        defaultPageSize={10}
        loading={loading}
        rowData={posts}
        rowKey="id"
        selectedRowKeys={selectedRows}
        totalCount={posts.length}
        onRowSelect={handleRowSelection}
      />
      <FilterPane
        isOpen={isFilterPaneOpen}
        onApplyFilter={filters => fetchPosts(visibleColumns, filters)}
        onClose={() => setIsFilterPaneOpen(false)}
      />
    </div>
  );
};

export default MyPosts;
