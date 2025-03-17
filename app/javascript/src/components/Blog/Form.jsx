import React, { useState, useEffect } from "react";

import { Input, Select, Textarea } from "@bigbinary/neetoui";
import { Formik, Form as FormikForm } from "formik";
import Logger from "js-logger";
import * as Yup from "yup";

import categoriesApi from "apis/category";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Title cannot exceed 50 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  category_ids: Yup.array().min(1, "Select at least one category"),
});

const Form = ({
  title: initialTitle = "",
  description: initialDescription = "",
  category_ids: initialCategoryIds = [],
  handleSubmit,
  onChange,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await categoriesApi.fetch();
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        Logger.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: initialTitle,
        description: initialDescription,
        category_ids: initialCategoryIds,
      }}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
          onChange(values);
        }, [values]);

        // Find the selected category options
        const selectedCategories = categories.filter(category =>
          values.category_ids.includes(category.id)
        );

        return (
          <FormikForm className="mb-4 w-full space-y-4">
            <Input
              error={touched.title && errors.title}
              label="Title*"
              maxLength={50}
              name="title"
              placeholder="Blog Title (Max 50 Characters Allowed)"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Select
              isMulti
              error={touched.category_ids && errors.category_ids}
              label="Categories*"
              name="category_ids"
              placeholder="Select categories"
              options={categories.map(category => ({
                value: category.id,
                label: category.name,
              }))}
              value={selectedCategories.map(category => ({
                value: category.id,
                label: category.name,
              }))}
              onChange={selectedOptions => {
                setFieldValue(
                  "category_ids",
                  selectedOptions.map(option => option.value)
                );
              }}
            />
            <Textarea
              error={touched.description && errors.description}
              label="Description*"
              name="description"
              placeholder="Blog Description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
