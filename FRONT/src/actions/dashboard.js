export const TOGGLE_SHARING_MODAL = "TOGGLE_SHARING_MODAL";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SAVE_DASHBOARD_DATA = "SAVE_DASHBOARD_DATA";

export const toggleSharingModal = () => ({
  type: TOGGLE_SHARING_MODAL,
});

export const getDashboardData = () => ({
  type: GET_DASHBOARD_DATA,
});

export const saveDashboardData = (payload) => ({
  type: SAVE_DASHBOARD_DATA,
  payload,
});