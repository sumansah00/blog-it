import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { Typography } from "neetoui";
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
      setBlog(post);
      setPageLoading(false);
    } catch (error) {
      Logger.error("Failed to fetch blog:", error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  if (!blog) {
    return (
      <div className="p-6">
        <Typography style="body2">No blog found with this slug.</Typography>
      </div>
    );
  }

  // Format the date
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6">
      <article className="flex flex-col gap-4 p-4">
        <header className="flex justify-between">
          <Typography style="h2" weight="bold">
            {blog.title}
          </Typography>
        </header>
        <Typography className="text-gray-600" style="body3">
          Published on {formattedDate}
        </Typography>
        <div className="mt-4">
          <Typography style="body1">{blog.description}</Typography>
        </div>
      </article>
    </div>
  );
};

export default Blog;
