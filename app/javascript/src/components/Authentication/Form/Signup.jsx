import React, { useEffect, useState } from "react";

import { Button, Input, Select } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { Link } from "react-router-dom";

import organizationsApi from "apis/organization";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
  setOrganizationId,
}) => {
  const [organizations, setOrganizations] = useState([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await organizationsApi.fetch();
        setOrganizations(response.data.organizations);
      } catch (error) {
        Logger.error("Failed to fetch organizations:", error);
      } finally {
        setOrganizationsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
      px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-center text-3xl font-extrabold
          leading-9 text-gray-700"
        >
          Sign Up
        </h2>
        <div className="text-center">
          <Link
            to="/"
            className="mt-2 text-center text-sm font-medium
              text-bb-purple transition duration-150 ease-in-out
              focus:underline focus:outline-none"
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Select
            isLoading={organizationsLoading}
            label="Organization"
            placeholder="Select an organization"
            options={organizations.map(org => ({
              value: org.id,
              label: org.name,
            }))}
            onChange={selectedOption => setOrganizationId(selectedOption.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button label="Register" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
