import { getDashboardApi } from "../apis/dashboardApis";
import { httpSuccess, messageHttpRequest } from "../helpers/httpRequest";


export function getDashboard(setState, params = {}) {
  setState({ isLoading: true });
  getDashboardApi(params)
    .then(res => {
      if (httpSuccess(res.status)) {
          res.data.new_user_id_by_date = res.data.new_user_id_by_date.map((obj, index)=>{
          return {...obj, count: index % 2 == 0 ? index * index * 3 : index * index * index}
      })
        setState({
          isLoading: false,
          data: res.data,
        });
      }
    })
    .catch(error => {
      messageHttpRequest(error);
    })
    .finally(()=>{
        setState({ isLoading: false });
    });
}
