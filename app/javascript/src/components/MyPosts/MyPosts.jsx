import React, { useState, useEffect } from "react";

import { MenuHorizontal, Delete, Clock, Column, Filter } from "neetoicons";
import { Dropdown, Table, Typography, Checkbox, Button } from "neetoui";
import { useHistory } from "react-router-dom";

import postsApi from "apis/post";

import FilterPane from "./FilterPane";

const MyPosts = () => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = Dropdown;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    categories: true,
    last_published_at: true,
    status: true,
    actions: true,
  });
  const history = useHistory();

  const handleDelete = async slug => {
    try {
      logger.info("Deleting post:", slug);
      await postsApi.destroy(slug);
      await fetchPosts();
    } catch (error) {
      logger.error("Error deleting post:", error);
    }
  };

  const handleUnpublish = async slug => {
    try {
      logger.info("Unpublishing post:", slug);
      await postsApi.update(slug, { status: "draft" });
      await fetchPosts();
    } catch (error) {
      logger.error("Error unpublishing post:", error);
    }
  };

  const handlePublish = async slug => {
    try {
      logger.info("Publishing post:", slug);
      await postsApi.update(slug, { status: "published" });
      await fetchPosts();
    } catch (error) {
      logger.error("Error publishing post:", error);
    }
  };

  const handleColumnToggle = columnKey => {
    // Prevent toggling the title column
    if (columnKey === "title") return;

    setVisibleColumns(prev => {
      const newVisibleColumns = {
        ...prev,
        [columnKey]: !prev[columnKey],
      };

      // Fetch posts with updated column preferences
      fetchPosts(newVisibleColumns);

      return newVisibleColumns;
    });
  };

  const handleTitleClick = slug => {
    history.push(`/posts/${slug}/show`);
  };

  const handleFilter = () => {
    setIsFilterPaneOpen(true);
  };

  const handleApplyFilter = filters => {
    logger.info("Applying filters:", filters);
    // Implement your filter logic here
    // You might want to pass these filters to your fetchPosts function
  };

  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (title, post) => (
        <span
          className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
          onClick={() => handleTitleClick(post?.slug)}
        >
          {(title || "Untitled").substring(0, 50)}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      width: 200,
      render: categories => {
        if (!categories || !Array.isArray(categories)) return "-";

        return (
          categories
            .filter(category => category && category.name)
            .map(category => category.name)
            .join(", ") || "-"
        );
      },
      hidden: !visibleColumns.categories,
    },
    {
      title: "Last Published At",
      dataIndex: "last_published_at",
      key: "last_published_at",
      width: 150,
      render: date => {
        if (!date) return "-";
        try {
          return new Date(date).toLocaleDateString();
        } catch (error) {
          logger.error("Invalid date format:", error);

          return "-";
        }
      },
      hidden: !visibleColumns.last_published_at,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => {
        if (!status) return "-";

        return status.charAt(0).toUpperCase() + status.slice(1);
      },
      hidden: !visibleColumns.status,
    },
    {
      key: "actions",
      width: 150,
      hidden: !visibleColumns.actions,
      render: (_, post) => {
        if (!post || !post.slug) return null;

        return (
          <Dropdown
            buttonStyle="secondary"
            icon={MenuHorizontal}
            strategy="fixed"
          >
            <Menu>
              {post.status === "published" && (
                <MenuItemButton
                  icon={Clock}
                  onClick={() => handleUnpublish(post.slug)}
                >
                  Unpublish
                </MenuItemButton>
              )}
              {post.status === "draft" && (
                <MenuItemButton
                  icon={Clock}
                  onClick={() => handlePublish(post.slug)}
                >
                  Publish
                </MenuItemButton>
              )}
              <MenuItemButton
                icon={Delete}
                style="danger"
                onClick={() => handleDelete(post.slug)}
              >
                Delete
              </MenuItemButton>
            </Menu>
          </Dropdown>
        );
      },
    },
  ];

  const fetchPosts = async (columns = visibleColumns) => {
    try {
      setLoading(true);
      const visibleColumnsList = Object.entries(columns)
        .filter(([_, isVisible]) => isVisible)
        .map(([columnKey]) => columnKey);

      const response = await postsApi.list({
        filter: "my_posts",
        visible_columns: visibleColumnsList.join(","),
      });

      // Validate and sanitize the response data
      const sanitizedPosts = (response?.data?.posts || []).map(post => ({
        ...post,
        categories: Array.isArray(post.categories) ? post.categories : [],
        title: post.title || "Untitled",
        status: post.status || "draft",
        id: post.id || Math.random().toString(36).substr(2, 9), // Fallback ID if needed
      }));

      setPosts(sanitizedPosts);
    } catch (error) {
      logger.error("Error fetching posts:", error);
      setPosts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const ColumnFilterMenu = () => (
    <Dropdown
      position="bottom-end"
      buttonProps={{
        icon: Column,
        style: "secondary",
        label: "Columns",
      }}
    >
      <Menu>
        {columnData
          .filter(column => column && column.key)
          .map(column => (
            <div className="p-2" key={column.key}>
              <Checkbox
                checked={visibleColumns[column.key]}
                disabled={column.key === "title"}
                id={`column-${column.key}`}
                label={column.title || column.key}
                onChange={() => handleColumnToggle(column.key)}
              />
            </div>
          ))}
      </Menu>
    </Dropdown>
  );

  return (
    <div className="max-w-full overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Typography style="h1">My Posts</Typography>
          <Typography style="body2" weight="bold">
            {posts.length} articles
          </Typography>
        </div>
        <div>
          <ColumnFilterMenu />
          <Button icon={Filter} style="tertiary" onClick={handleFilter} />
        </div>
      </div>
      <Table
        bordered
        enableColumnResize
        columnData={columnData.filter(column => column && !column.hidden)}
        defaultPageSize={10}
        loading={loading}
        rowData={posts}
        rowKey="id"
        totalCount={posts.length}
        rowSelection={{
          type: "checkbox",
          onChange: selectedRowKeys => {
            logger.info("Selected Row Keys:", selectedRowKeys);
          },
        }}
      />
      <FilterPane
        isOpen={isFilterPaneOpen}
        onApplyFilter={handleApplyFilter}
        onClose={() => setIsFilterPaneOpen(false)}
      />
    </div>
  );
};

export default MyPosts;
