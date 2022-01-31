import { TOGGLE_SHARING_MODAL } from "src/actions/dashboard";
import { SAVE_DASHBOARD_DATA } from "src/actions/dashboard";

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  sharingModalOpened: false,
};

const dashboard = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SHARING_MODAL:
      return {
        ...state,
        sharingModalOpened: !state.sharingModalOpened
      };
    case SAVE_DASHBOARD_DATA:
      return {
        ...state,
        artists: action.payload.artists,
        albums: action.payload.albums,
        tracks: action.payload.tracks,
      };
    default:
      return state;
  }
};

export default dashboard;
