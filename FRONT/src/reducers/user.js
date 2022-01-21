import { SAVE_USER } from '../actions/user';

const initialState = {
  isLogged: false,
  email: '',
  lastname: '',
  firstname: '',
  pseudo: '',
  password: '',
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        ...action.payload,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default user;
