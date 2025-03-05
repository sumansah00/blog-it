import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Post = ({ blog }) => {
  const {
    title,
    description,
    created_at,
    slug,
    user,
    categories,
    organization,
  } = blog;
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/posts/${slug}/show`);
  };

  return (
    <div
      className="border-1 flex cursor-pointer flex-col gap-1 rounded-md border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
      onClick={handleCardClick}
    >
      <Typography style="h4">{title}</Typography>
      <Typography className="line-clamp-2 overflow-hidden text-sm text-gray-600">
        {description}
      </Typography>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col">
          <Typography className="text-xs text-gray-500">
            Author: {user?.name || "Unknown"}
          </Typography>
          <Typography className="text-xs text-gray-500">
            Organization: {organization?.name || "Unknown"}
          </Typography>
        </div>
        <Typography className="text-xs text-gray-400">
          {dayjs(created_at).format("D MMMM YYYY")}
        </Typography>
      </div>
      {categories && categories.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {categories.map(category => (
            <span
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
              key={category.id}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    slug: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Post;
