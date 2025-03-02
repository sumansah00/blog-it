import React, { useState } from "react";

import Logger from "js-logger";

import postsApi from "apis/post";

import Form from "./Form";

const Create = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    try {
      await postsApi.create(values);
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-8">
        <Form handleSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default Create;
