import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { Edit } from "neetoicons";
import { Typography, Button, Avatar } from "neetoui";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";

import postsApi from "apis/post";
import { PageLoader } from "components/commons";
import { getFromLocalStorage } from "utils/storage";

const Blog = ({ previewData }) => {
  const [blog, setBlog] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);

  const { slug } = useParams();
  const history = useHistory();

  const fetchBlog = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setBlog(post);

      // Check if current user is the author
      const currentUserId = getFromLocalStorage("authUserId");
      setIsAuthor(
        currentUserId && post.user && post.user.id === parseInt(currentUserId)
      );

      setPageLoading(false);
    } catch (error) {
      Logger.error("Failed to fetch blog:", error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (previewData) {
      setBlog(previewData);
      setPageLoading(false);

      return;
    }

    fetchBlog();
  }, []);

  const handleEdit = () => {
    history.push(`/posts/${slug}/edit`);
  };

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

  // Format the date (use last_published_at if available, otherwise use created_at)
  const dateToDisplay = blog.last_published_at || blog.created_at;
  const formattedDate = new Date(dateToDisplay).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6">
      <article className="flex flex-col gap-4 p-4">
        {/* Categories/Tags at the top */}
        {blog.categories && blog.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.categories.map(category => (
              <span
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                key={category.id}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
        {/* Title next */}
        <header className="flex items-center justify-between">
          <Typography style="h2" weight="bold">
            {blog.title}
          </Typography>
          <Typography className="text-gray-600" style="body3">
            {formattedDate}{" "}
            {blog.last_published_at ? "(published)" : "(created)"}
          </Typography>
          {isAuthor && (
            <Button
              icon={Edit}
              size="small"
              tooltipProps={{
                position: "top",
                content: "Edit Blog",
              }}
              onClick={handleEdit}
            />
          )}{" "}
        </header>
        {/* Author with image, name and date */}
        <div className="mt-2 flex items-center gap-3">
          {blog.user && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                {blog.user.avatar_url ? (
                  <Avatar
                    size="medium"
                    user={{
                      name: blog.user.name,
                      imageUrl: blog.user.avatar_url,
                    }}
                  />
                ) : (
                  <span className="text-sm text-gray-600">
                    {blog.user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Typography
                  className="text-gray-700"
                  style="body3"
                  weight="semibold"
                >
                  {blog.user.name}
                </Typography>
                <Typography className="text-gray-600" style="body3">
                  Published on {formattedDate}
                  {blog.organization && ` • ${blog.organization.name}`}
                </Typography>
              </div>
            </div>
          )}
        </div>
        {/* Description at the bottom */}
        <div className="mt-4">
          <Typography style="body1">{blog.description}</Typography>
        </div>
      </article>
    </div>
  );
};

Blog.propTypes = {
  previewData: PropTypes.object,
};

export default Blog;
