import React, { useState } from "react";

import Logger from "js-logger";

import postsApi from "apis/post";

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

  return (
    <div>
      <PostHeader
        isSubmitting={loading}
        title="Create New Post"
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
