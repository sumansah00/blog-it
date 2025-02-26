import axios from "axios";

const fetch = (params = {}) => axios.get("/posts", { params });

const postsApi = { fetch };

export default postsApi;
