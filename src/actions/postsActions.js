import { getPostsApi, hidePostApi } from "../apis/PostsApis";
import { httpSuccess, messageHttpRequest } from "../helpers/httpRequest";
import { formatPagination } from "../helpers/utility";

export function getPosts(setState, params = {}) {
  setState({ isLoading: true });
  getPostsApi(params)
    .then(res => {
      if (httpSuccess(res.status)) {
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
export function hidePost(setState, success, postId) {
  setState({ isLoading: true });
  hidePostApi(postId)
    .then(res => {
      if (httpSuccess(res.status)) {
          success();
      }
    })
    .catch(error => {
      messageHttpRequest(error);
    }).finally(()=>{
        setState({ isLoading: false });
    });
}
