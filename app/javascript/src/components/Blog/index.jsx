import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import postsApi from "apis/post";
import { PageLoader } from "components/commons";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const fetchBlog = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      Logger.info("Fetched blog:", post);
      setBlog(post);
      setPageLoading(false);
    } catch (error) {
      Logger.error("Failed to fetch blog:", error);
      setPageLoading(false);
    }
  };

  const handleEdit = blogId => {
    Logger.info(`Edit clicked for blog ${blogId}`);
    // You can implement navigation to edit page here
    // history.push(`/blogs/${blogId}/edit`);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  if (!blog) {
    return <div className="p-6">No blog found with this slug.</div>;
  }

  // Format the date
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6">
      <article className="flex flex-col gap-4">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => handleEdit(blog.id)}
          >
            Edit
          </button>
        </header>
        <div className="text-sm">Published on {formattedDate}</div>
        <div className="mt-4">
          <p>{blog.description}</p>
        </div>
      </article>
    </div>
  );
};

export default Blog;
