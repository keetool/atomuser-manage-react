import axios from "axios";
import { MANAGE_API_URL } from "../constants/env";

export function getPostsApi(params = {}) {
  let url = MANAGE_API_URL + `v1/post/all`;
  return axios.get(url, {
    params: {
      page: params.page ? params.page : 1,
      limit: 10,
      order: params.sortCreatedAt ? params.sortCreatedAt : ""
    }
  });
}
