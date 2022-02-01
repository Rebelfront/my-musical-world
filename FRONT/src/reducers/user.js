import { SAVE_USER, USER_LOGOUT, USER_RESET } from 'src/actions/user';

const initialState = {
  isLogged: false,
  mail: '',
  lastname: '',
  firstname: '',
  pseudo: '',
  id: null,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        ...action.payload,
        isLogged: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
        mail: '',
        lastname: '',
        firstname: '',
        pseudo: '',
        id: null,
      };
    case USER_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default user;
