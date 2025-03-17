import React, { useState, useEffect } from "react";

import { MenuHorizontal, Delete, Clock } from "neetoicons";
import { Dropdown, Table, Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import postsApi from "apis/post";

const MyPosts = () => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = Dropdown;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    },
    {
      title: "Last Published At",
      dataIndex: "last_published_at",
      key: "last_published_at",
      width: 150,
      render: date => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => status.charAt(0).toUpperCase() + status.slice(1),
    },
    {
      key: "actions",
      width: 150,
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

  const fetchPosts = async () => {
    try {
      logger.info("Fetching posts...");
      const response = await postsApi.list({ filter: "my_posts" });
      logger.info("Posts response:", response);
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

  return (
    <div>
      <Typography style="h1">My Posts</Typography>
      <Typography className="mb-6" style="body2" weight="bold">
        {posts.length} articles
      </Typography>
      <Table
        bordered
        enableColumnResize
        columnData={columnData}
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
