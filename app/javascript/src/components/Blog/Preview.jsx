import React from "react";

import { useLocation } from "react-router-dom";

import Blog from ".";

const Preview = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const previewData = JSON.parse(decodeURIComponent(searchParams.get("data")));

  return (
    <div>
      <div className="flex justify-between border-b p-4">
        <h1 className="text-xl font-bold">Preview Mode</h1>
      </div>
      <Blog previewData={previewData} />
    </div>
  );
};

export default Preview;
