import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from '../actions/login';
import { CHANGE_INPUT } from '../actions';

const initialState = {
  modalOpened: false,
  mail: 'bouclierman@herocorp.io',
  password: 'jennifer',
};

const login = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        modalOpened: true,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        modalOpened: false,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default login;
