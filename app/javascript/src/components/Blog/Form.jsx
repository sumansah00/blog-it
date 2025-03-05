import React, { useState, useEffect } from "react";

import { Input, Button, Select } from "@bigbinary/neetoui";
import { Formik, Form as FormikForm } from "formik";
import Logger from "js-logger";
import * as Yup from "yup";

import categoriesApi from "apis/category";
import organizationsApi from "apis/organization";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Title cannot exceed 50 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  organization_id: Yup.number().required("Organization is required"),
  category_ids: Yup.array().min(1, "Select at least one category"),
});

const Form = ({
  title: initialTitle = "",
  description: initialDescription = "",
  organization_id: initialOrganizationId = "",
  category_ids: initialCategoryIds = [],
  loading,
  handleSubmit,
}) => {
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [organizationsResponse, categoriesResponse] = await Promise.all([
          organizationsApi.fetch(),
          categoriesApi.fetch(),
        ]);
        setOrganizations(organizationsResponse.data.organizations);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        Logger.error("Failed to fetch form data:", error);
      } finally {
        setLoadingData(false);
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
        organization_id: initialOrganizationId,
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
        isSubmitting,
        setFieldValue,
      }) => {
        // Find the selected organization option
        const selectedOrganization = organizations.find(
          org => org.id === values.organization_id
        );

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
              error={touched.organization_id && errors.organization_id}
              label="Organization*"
              name="organization_id"
              placeholder="Select an organization"
              options={organizations.map(org => ({
                value: org.id,
                label: org.name,
              }))}
              value={
                selectedOrganization
                  ? {
                      value: selectedOrganization.id,
                      label: selectedOrganization.name,
                    }
                  : null
              }
              onChange={selectedOption => {
                setFieldValue("organization_id", selectedOption.value);
              }}
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
            <Input
              error={touched.description && errors.description}
              label="Description*"
              name="description"
              placeholder="Blog Description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Button
              label="Submit"
              loading={loading || isSubmitting || loadingData}
              type="submit"
            />
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
