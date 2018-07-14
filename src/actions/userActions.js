import { getUsersApi } from "../apis/userApis";
import { httpSuccess, messageHttpRequest } from "../helpers/httpRequest";
//import { formatPagination } from "../helpers/utility";

export function getUsers(setState, params = {}) {
  setState({ isLoading: true });
  getUsersApi(params)
    .then(res => {
      if (httpSuccess(res.status)) {
        setState({
          isLoading: false,
          data: res.data.data,
          //pagination: formatPagination(res.data.meta)
        });
      } else {
        setState({ isLoading: false });
      }
    })
    .catch(error => {
      messageHttpRequest(error);
      setState({ isLoading: false });
    });
}
