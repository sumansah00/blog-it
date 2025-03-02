import React from "react";

import { Input, Button } from "@bigbinary/neetoui";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Title cannot exceed 50 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const Form = ({
  title: initialTitle = "",
  description: initialDescription = "",
  loading,
  handleSubmit,
}) => (
  <Formik
    validationSchema={validationSchema}
    initialValues={{
      title: initialTitle,
      description: initialDescription,
    }}
    onSubmit={values => {
      handleSubmit(values);
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
      <FormikForm className="mb-4 w-full space-y-2">
        <Input
          error={touched.title && errors.title}
          label="Title*"
          maxLength={50}
          name="title"
          placeholder="Todo Title (Max 50 Characters Allowed)"
          value={values.title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          error={touched.description && errors.description}
          label="Description*"
          name="description"
          placeholder="Todo Description"
          value={values.description}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button
          label="Submit"
          loading={loading || isSubmitting}
          type="submit"
        />
      </FormikForm>
    )}
  </Formik>
);

export default Form;
