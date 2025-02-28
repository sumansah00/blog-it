import axios from "axios";

const fetch = (params = {}) => axios.get("/posts", { params });

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
