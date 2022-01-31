import axios from "axios";
import { GET_DASHBOARD_DATA } from "src/actions/dashboard";
import { saveDashboardData } from "src/actions/dashboard";
import { DELETE_DASHBOARD_ITEM } from "src/actions/dashboard";

const dashboardMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      const token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: `${rootAPIUrl}/dashboard/`,
        headers: {
          Authorization: token,
        }
      })
      .then((res) => {
        const action = saveDashboardData(res.data);
        store.dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
      
      break;

      case DELETE_DASHBOARD_ITEM:
      const token = localStorage.getItem('token');
      axios({
        method: 'delete',
        url: `${rootAPIUrl}/dashboard/${action.payload.type}`,
        headers: {
          Authorization: token,
        },
        data: action.payload.apiId
      })
      .then((res) => {
        const action = saveDashboardData(res.data);
        store.dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
      
      break;
  
    default:
      next(action);
      break;
  }

};

export default dashboardMW;