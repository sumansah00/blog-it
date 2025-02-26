import React from "react";

import dayjs from "dayjs";
import PropTypes from "prop-types";

const Post = ({ blog }) => {
  const { title, description, created_at } = blog;

  return (
    <div className="flex gap-4 p-4 outline">
      <h2>{title}</h2>
      <div>
        <p>{description}</p>
      </div>
      <p>{dayjs(created_at).format("D MMMM YYYY")}</p>
    </div>
  );
};

Post.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
