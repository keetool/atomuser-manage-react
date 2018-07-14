import axios from "axios";
import { BASE_API_URL } from "../constants/env";

export function getUsersApi(params = {}) {
  let url = BASE_API_URL + `v1/user/list/new`;
  return axios.get(url, {
    params: {
      page: params.page ? params.page : 1,
      limit: 20,
    }
  });
}
