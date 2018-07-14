import axios from "axios";
import { MANAGE_API_URL } from "../constants/env";

export function getDashboardApi(type,params = {}) {
  
  let url = MANAGE_API_URL + `v1/dashboard/` + type;
  return axios.get(url, {
    params: {
      start_time: params.start_time || '',
      end_time: params.end_time || '',
    }
  });
}
