import React, { useState, useEffect } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Typography } from "@bigbinary/neetoui";

import postsApi from "apis/post";

import Card from "./Card";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await postsApi.fetch();
        setBlogs(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch blogs", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-6 p-8">
      <Typography style="h1">Blogs</Typography>
      <div className="flex flex-col gap-4">
        {isNotEmpty(blogs) ? (
          blogs.map(blog => <Card blog={blog} key={blog.id} />)
        ) : (
          <Typography>No blogs available</Typography>
        )}
      </div>
    </div>
  );
};

export default Blogs;
