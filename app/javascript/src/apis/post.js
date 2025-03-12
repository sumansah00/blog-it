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

const update = (slug, payload) =>
  axios.put(`/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`/posts/${slug}`);

const list = (params = {}) => axios.get("/posts", { params });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  list,
};

export default postsApi;
