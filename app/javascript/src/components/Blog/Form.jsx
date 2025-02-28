import React from "react";

const Form = ({
  title,
  description,
  setTitle,
  setDescription,
  loading,
  handleSubmit,
}) => (
  <form className="mb-4 w-full space-y-2" onSubmit={handleSubmit}>
    <input
      label="Title"
      placeholder="Todo Title (Max 50 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 50))}
    />
    <input
      label="Description"
      placeholder="Todo Description"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <button loading={loading} type="submit">
      Submit
    </button>
  </form>
);

export default Form;
