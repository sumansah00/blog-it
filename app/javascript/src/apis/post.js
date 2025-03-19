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

const list = (params = {}) => axios.get("/posts/my_post", { params });

const bulkUpdateStatus = (ids, status) =>
  axios.put("/posts/bulk_update_status", {
    post_ids: ids,
    status,
  });

const bulkDelete = ids =>
  axios.delete("/posts/bulk_delete", {
    data: { post_ids: ids },
  });

const upvote = id => axios.post(`/posts/${id}/upvote`);
const downvote = id => axios.post(`/posts/${id}/downvote`);

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  list,
  bulkUpdateStatus,
  bulkDelete,
  upvote,
  downvote,
};

export default postsApi;
