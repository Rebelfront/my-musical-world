import { TOGGLE_SHARING_MODAL, SAVE_DASHBOARD_DATA, DELETE_DASHBOARD_ITEM } from 'src/actions/dashboard';

import { SUBMIT_ADD_MUSIC } from 'src/actions/addMusic';

const initialState = {
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
        artists: action.payload.artists,
        albums: action.payload.albums,
        tracks: action.payload.tracks,
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
    default:
      return state;
  }
};

export default dashboard;
