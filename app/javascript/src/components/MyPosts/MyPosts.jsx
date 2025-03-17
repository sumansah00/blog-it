import React, { useState, useEffect } from "react";

import { MenuHorizontal, Delete, Clock, Column } from "neetoicons";
import { Dropdown, Table, Typography, Checkbox } from "neetoui";
import { useHistory } from "react-router-dom";

import postsApi from "apis/post";

const MyPosts = () => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = Dropdown;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (title, post) => (
        <span
          className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
          onClick={() => handleTitleClick(post.slug)}
        >
          {title.substring(0, 50)}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      width: 200,
      render: categories =>
        categories.map(category => category.name).join(", "),
      hidden: !visibleColumns.categories,
    },
    {
      title: "Last Published At",
      dataIndex: "last_published_at",
      key: "last_published_at",
      width: 150,
      render: date => (date ? new Date(date).toLocaleDateString() : "-"),
      hidden: !visibleColumns.last_published_at,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => status.charAt(0).toUpperCase() + status.slice(1),
      hidden: !visibleColumns.status,
    },
    {
      key: "actions",
      width: 150,
      hidden: !visibleColumns.actions,
      render: (_, post) => (
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
      ),
    },
  ];

  const fetchPosts = async (columns = visibleColumns) => {
    try {
      setLoading(true);
      // Convert visible columns object to array of visible column keys
      const visibleColumnsList = Object.entries(columns)
        .filter(([_, isVisible]) => isVisible)
        .map(([columnKey]) => columnKey);

      const response = await postsApi.list({
        filter: "my_posts",
        visible_columns: visibleColumnsList.join(","),
      });
      setPosts(response.data.posts || []);
    } catch (error) {
      logger.error("Error fetching posts:", error);
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
        {columnData.map(column => {
          if (!column.key) return null;

          return (
            <div className="p-2" key={column.key}>
              <Checkbox
                checked={visibleColumns[column.key]}
                disabled={column.key === "title"}
                id={`column-${column.key}`}
                label={column.title || column.key}
                onChange={() => handleColumnToggle(column.key)}
              />
            </div>
          );
        })}
      </Menu>
    </Dropdown>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Typography style="h1">My Posts</Typography>
          <Typography style="body2" weight="bold">
            {posts.length} articles
          </Typography>
        </div>
        <div>
          <ColumnFilterMenu />
        </div>
      </div>
      <Table
        bordered
        enableColumnResize
        columnData={columnData.filter(column => !column.hidden)}
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
    </div>
  );
};

export default MyPosts;
