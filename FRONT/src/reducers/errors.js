import { SIGNUP_FAILURE } from 'src/actions/signup';
import { LOGIN_FAILURE } from 'src/actions/login';

const initialState = {
  error: '',
};

const error = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_FAILURE :
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAILURE :
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default error;
