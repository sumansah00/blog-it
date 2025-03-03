import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Post = ({ blog }) => {
  const { title, description, created_at, slug } = blog;
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
      <Typography className="text-xs text-gray-400">
        {dayjs(created_at).format("D MMMM YYYY")}
      </Typography>
    </div>
  );
};

Post.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
