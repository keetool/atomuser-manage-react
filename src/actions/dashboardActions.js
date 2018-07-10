import { getDashboardApi } from "../apis/dashboardApis";
import { httpSuccess, messageHttpRequest } from "../helpers/httpRequest";


export function getDashboard(setState,type,params = {}) {
  setState({ isLoading: true });
  getDashboardApi(type,params)
    .then(res => {
      if (httpSuccess(res.status)) {
        let total = res.data['total'];
        res.data = res.data['charts']
           .map((obj, index)=>{return {...obj, count: index % 2 == 0 ? index * index * 3 : index * index * index};});
          
        setState({
          isLoading: false,
          data: res.data,
          total
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

//  res :{
//    data:{
//      charts: [
//        {date: '', count:''},
//        {date: '', count:''},
//        {date: '', count:''},
//        {date: '', count:''},
//      ],
//      total: 1234
//    }
//  }