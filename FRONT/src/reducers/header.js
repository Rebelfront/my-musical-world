import { TOGGLE_MOBILE_MENU } from "src/actions/header";

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
    default:
      return state;
  }
};

export default header;
