import React, { useState } from "react";

import postsApi from "apis/post";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-8">
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </div>
  );
};

export default Create;
