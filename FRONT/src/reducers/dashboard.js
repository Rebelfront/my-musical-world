import { TOGGLE_SHARING_MODAL } from "src/actions/dashboard";

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
        sharingModalOpened: !sharingModalOpened
      };
    default:
      return state;
  }
};

export default dashboard;
