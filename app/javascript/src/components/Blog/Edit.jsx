import React, { useState, useEffect } from "react";

import Logger from "js-logger";

import postsApi from "apis/post";

import Form from "./Form";
import PostHeader from "./PostHeader";

const Edit = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [formValues, setFormValues] = useState(null);
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

  const handleFormChange = values => {
    setFormValues(values);
  };

  const handleSubmit = async (values, status) => {
    setLoading(true);
    try {
      await postsApi.update(slug, { ...values, status });
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error("Error updating post:", error);
      setLoading(false);
    }
  };

  const handleSaveAsDraft = () => {
    if (formValues) {
      handleSubmit(formValues, "draft");
    }
  };

  const handlePublish = () => {
    if (formValues) {
      handleSubmit(formValues, "published");
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await postsApi.destroy(slug);
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error("Error deleting post:", error);
      setLoading(false);
    }
  };

  if (fetchingPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostHeader
        isEdit
        isSubmitting={loading}
        title="Edit Post"
        onDelete={handleDelete}
        onPublish={handlePublish}
        onSaveAsDraft={handleSaveAsDraft}
      />
      {post && (
        <div className="flex flex-col gap-y-8">
          <Form
            category_ids={post.categories.map(category => category.id) || []}
            description={post.description}
            handleSubmit={() => {}}
            loading={loading}
            organization_id={post.organization.id}
            title={post.title}
            onChange={handleFormChange}
          />
        </div>
      )}
    </div>
  );
};

export default Edit;
