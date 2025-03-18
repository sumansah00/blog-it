import React from "react";

import PostActions from "./Actions";

export const getColumnConfig = ({
  visibleColumns,
  onNavigate,
  onDelete,
  onPublish,
  onUnpublish,
}) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 250,
    render: (title, post) => (
      <span
        className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
        onClick={() => onNavigate(post?.slug)}
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
    render: (_, post) => (
      <PostActions
        post={post}
        onDelete={onDelete}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
      />
    ),
  },
];
