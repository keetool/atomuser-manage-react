import { getPostsApi } from "../apis/PostsApis";
import { httpSuccess, messageHttpRequest } from "../helpers/httpRequest";
import { formatPagination } from "../helpers/utility";

export function getPosts(setState, params = {}) {
  setState({ isLoading: true });
  getPostsApi(params)
    .then(res => {
      if (httpSuccess(res.status)) {
          console.log(res);
        setState({
          isLoading: false,
          data: res.data.data,
          pagination: formatPagination(res.data.meta)
        });
      }
    })
    .catch(error => {
      messageHttpRequest(error);
    }).finally(()=>{
        setState({ isLoading: false });
    });
}
