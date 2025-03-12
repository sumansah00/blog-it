import React, { useState } from "react";

import Logger from "js-logger";

import postsApi from "apis/post";
import { getFromLocalStorage } from "utils/storage";

import Form from "./Form";
import PostHeader from "./PostHeader";

const Create = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const handleFormChange = values => {
    setFormValues(values);
  };

  const handleSubmit = async (values, status) => {
    setLoading(true);
    try {
      await postsApi.create({ ...values, status });
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error(error);
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

  const handlePreview = () => {
    if (formValues) {
      const previewData = {
        title: formValues.title,
        description: formValues.description,
        categories: formValues.category_ids || [],
        created_at: new Date().toISOString(),
        user: {
          name: getFromLocalStorage("authUserName"),
          id: getFromLocalStorage("authUserId"),
        },
      };

      const queryParams = encodeURIComponent(JSON.stringify(previewData));
      window.open(`/posts/preview?data=${queryParams}`, "_blank");
    }
  };

  return (
    <div>
      <PostHeader
        isSubmitting={loading}
        title="Create New Post"
        onPreview={handlePreview}
        onPublish={handlePublish}
        onSaveAsDraft={handleSaveAsDraft}
      />
      <div className="flex flex-col gap-y-8">
        <Form
          handleSubmit={() => {}} // Form submission will be handled by header buttons
          loading={loading}
          onChange={handleFormChange}
        />
      </div>
    </div>
  );
};

export default Create;
