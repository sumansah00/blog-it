import React, { useState, useEffect } from "react";

import Post from "./Post";

import postsApi from "../../apis/post";

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
    <div>
      <h1>Blogs</h1>
      <div>
        {blogs.length > 0 ? (
          blogs.map(blog => <Post blog={blog} key={blog.id} />)
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
