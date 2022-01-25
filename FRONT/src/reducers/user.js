import { SAVE_USER, USER_LOGOUT } from 'src/actions/user';

const initialState = {
  isLogged: false,
  email: '',
  lastname: '',
  firstname: '',
  pseudo: '',
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
        email: '',
        lastname: '',
        firstname: '',
      }
    default:
      return state;
  }
};

export default user;
