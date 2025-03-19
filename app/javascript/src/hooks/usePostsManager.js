import { useState, useEffect } from "react";

import postsApi from "apis/post";

const usePostsManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    categories: true,
    last_published_at: true,
    status: true,
  });

  const fetchPosts = async (columns = visibleColumns, filters = {}) => {
    try {
      setLoading(true);
      const visibleColumnsList = Object.entries(columns)
        .filter(([_, isVisible]) => isVisible)
        .map(([columnKey]) => columnKey);

      const response = await postsApi.list({
        visible_columns: visibleColumnsList.join(","),
        title: filters.title || "",
        category_ids: filters.category_ids || [],
        status: filters.status || "",
      });

      const sanitizedPosts = (response?.data?.posts || []).map(post => ({
        ...post,
        categories: Array.isArray(post.categories) ? post.categories : [],
        title: post.title || "Untitled",
        upvotes: post.upvotes || 0,
        downvotes: post.downvotes || 0,
        is_bloggable: post.is_bloggable || false,
        user_vote: post.user_vote || null,
      }));

      setPosts(sanitizedPosts);
    } catch (error) {
      logger.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async slug => {
    try {
      await postsApi.destroy(slug);
      await fetchPosts();
    } catch (error) {
      logger.error("Error deleting post:", error);
    }
  };

  const handleStatusUpdate = async (slug, status) => {
    try {
      await postsApi.update(slug, { status });
      await fetchPosts();
    } catch (error) {
      logger.error(`Error ${status}ing post:`, error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    visibleColumns,
    setVisibleColumns,
    fetchPosts,
    handleDelete,
    handleStatusUpdate,
  };
};

export default usePostsManager;
