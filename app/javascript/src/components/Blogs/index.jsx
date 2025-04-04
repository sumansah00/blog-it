import React, { useState, useEffect } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Typography, Button } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useHistory, useLocation } from "react-router-dom";

import postsApi from "apis/post";

import Card from "./Card";

const Blogs = () => {
  const history = useHistory();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // Parse categories from query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParams = searchParams.getAll("category");
    const categoryIds = categoryParams.map(id => parseInt(id, 10));
    setSelectedCategoryIds(categoryIds);
  }, [location.search]);

  // Fetch blogs with category filtering
  // TODO: author and organization not fetched. Need to fetch and pass to Card component
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await postsApi.fetch({
          category_ids:
            selectedCategoryIds.length > 0 ? selectedCategoryIds : null,
        });
        setBlogs(response.data.posts);
      } catch (error) {
        setError("Failed to fetch blogs");
        Logger.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategoryIds]);

  if (loading) return <div>Loading blogs...</div>;

  if (error) return <div>Error: {error}</div>;

  const handleAddNewBlog = () => {
    history.push("/create");
  };

  const getPageTitle = () => {
    if (selectedCategoryIds.length === 0) {
      return "All Blog Posts";
    } else if (selectedCategoryIds.length === 1) {
      return "Posts in selected category";
    }

    return `Posts in ${selectedCategoryIds.length} categories`;
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <Typography style="h1">{getPageTitle()}</Typography>
        <Button label="Add New Blog Post" onClick={handleAddNewBlog} />
      </div>
      <div className="flex flex-col gap-4">
        {isNotEmpty(blogs) ? (
          blogs.map(blog => <Card blog={blog} key={blog.id} />)
        ) : (
          <Typography>
            No blogs available for the selected categories
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Blogs;
