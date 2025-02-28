import React from "react";

import Logger from "js-logger";

const Blog = ({ title, description }) => (
  <article className="blog-post mb-6 rounded-lg bg-white p-6 shadow-md">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="blog-title text-2xl font-bold text-gray-800">{title}</h2>
      <button
        className="edit-button rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={() => Logger.info("Edit clicked")}
      >
        Edit
      </button>
    </div>
    <div className="blog-content text-gray-600">
      <p className="leading-relaxed">{description}</p>
    </div>
  </article>
);

export default Blog;
