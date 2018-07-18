import { getUsersApi } from '../apis/userApis';
import { httpSuccess, messageHttpRequest } from '../helpers/httpRequest';
import { formatPagination } from '../helpers/utility';

export function getUsers(setState, params = {}) {
	setState({ isLoading: true });
	getUsersApi(params)
		.then((res) => {
			if (httpSuccess(res.status)) {
				setState({
					isLoading: false,
					data: res.data.data.users,
					comments_count: res.data.data.comments_count,
					posts_count: res.data.data.posts_count,
					users_count: res.data.data.users_count,
					pagination: res.data.meta ? formatPagination(res.data.meta) : null
				});
			} else {
				setState({ isLoading: false });
			}
		})
		.catch((error) => {
			messageHttpRequest(error);
			setState({ isLoading: false });
		});
}
