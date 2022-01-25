import { TOGGLE_MOBILE_MENU } from "src/actions/header";
import { SAVE_USER } from "src/actions/user";
import { USER_LOGOUT } from "../actions/user";

const initialState = {
  mobileMenuOpened: false,
};

const header = (state = initialState, action= {}) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpened: !state.mobileMenuOpened,
      }
      case SAVE_USER:
        return {
          ...state,
          mobileMenuOpened: false,
        };
      case USER_LOGOUT:
        return {
          ...state,
          mobileMenuOpened: false,
        };
    default:
      return state;
  }
};

export default header;
