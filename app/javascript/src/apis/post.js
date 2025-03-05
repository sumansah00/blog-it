import axios from "axios";

const fetch = (params = {}) => {
  if (
    params.category_ids &&
    Array.isArray(params.category_ids) &&
    params.category_ids.length > 0
  ) {
    params.category_ids = params.category_ids.join(",");
  }

  return axios.get("/posts", { params });
};

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const postsApi = {
  fetch,
  create,
  show,
};

export default postsApi;
