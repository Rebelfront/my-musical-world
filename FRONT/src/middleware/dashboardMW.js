import axios from 'axios';
import { GET_DASHBOARD_DATA, saveDashboardData, DELETE_DASHBOARD_ITEM } from 'src/actions/dashboard';

const dashboardMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  const token = localStorage.getItem('token');
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      axios({
        method: 'get',
        url: `${rootAPIUrl}/dashboard/`,
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          const actionDashboardSave = saveDashboardData(res.data);
          store.dispatch(actionDashboardSave);
        })
        .catch((err) => {
          console.log(err);
        });

      break;

    case DELETE_DASHBOARD_ITEM:
      axios({
        method: 'delete',
        url: `${rootAPIUrl}/dashboard/${action.payload.type}`,
        headers: {
          Authorization: token,
        },
        data: {
          apiId: action.payload.apiId,
        },
      })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default dashboardMW;
