import React, { useState, useEffect } from "react";

import Logger from "js-logger";

import postsApi from "apis/post";

import Form from "./Form";

const Edit = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(true);
  const { slug } = match.params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsApi.show(slug);
        setPost(response.data.post);
      } catch (error) {
        Logger.error("Error fetching post:", error);
        history.push("/");
      } finally {
        setFetchingPost(false);
      }
    };

    fetchPost();
  }, [slug, history]);

  const handleSubmit = async values => {
    setLoading(true);
    try {
      await postsApi.update(slug, values);
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error("Error updating post:", error);
      setLoading(false);
    }
  };

  if (fetchingPost) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-y-8">
        {post && (
          <Form
            category_ids={post.categories.map(category => category.id)}
            description={post.description}
            handleSubmit={handleSubmit}
            loading={loading}
            organization_id={post.organization.id}
            title={post.title}
          />
        )}
      </div>
    </div>
  );
};

export default Edit;
