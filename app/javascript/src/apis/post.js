import axios from "axios";

const fetch = (params = {}) => axios.get("/posts", { params });

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const postsApi = {
  fetch,
  create,
};

export default postsApi;
