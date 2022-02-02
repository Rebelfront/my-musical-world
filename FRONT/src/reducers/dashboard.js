import { TOGGLE_SHARING_MODAL, SAVE_DASHBOARD_DATA, DELETE_DASHBOARD_ITEM } from 'src/actions/dashboard';
import { SUBMIT_ADD_MUSIC } from 'src/actions/addMusic';
import { USER_LOGOUT } from 'src/actions/user';

const initialState = {
  pseudo: '',
  artists: [],
  albums: [],
  tracks: [],
  sharingModalOpened: false,
  dashboardChanged: false,
};

const dashboard = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SHARING_MODAL:
      return {
        ...state,
        sharingModalOpened: !state.sharingModalOpened,
      };
    case SAVE_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload,
        dashboardChanged: false,
      };
    case SUBMIT_ADD_MUSIC:
      return {
        ...state,
        dashboardChanged: true,
      };
    case DELETE_DASHBOARD_ITEM:
      return {
        ...state,
        dashboardChanged: true,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default dashboard;
