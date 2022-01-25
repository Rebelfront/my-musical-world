import axios from 'axios';
import { SUBMIT_LOGIN } from 'src/actions/login';
import { SUBMIT_SIGNUP } from 'src/actions/signup';
import { saveUser } from 'src/actions/user';
import { USER_LOGOUT } from '../actions/user';

const authenticationMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // double destructuration
      const { login: { mail, password } } = store.getState();

      axios.post(`${rootAPIUrl}/login`, {
        mail,
        password,
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    case SUBMIT_SIGNUP: {
      const { signup: { mail, pseudo, firstname, lastname, password } } = store.getState();

      axios.post(`${rootAPIUrl}/signup`, {
        mail,
        pseudo,
        firstname,
        lastname,
        password,
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    case USER_LOGOUT: {
      next(action);
      localStorage.setItem('token', '');
    }
    default:
      next(action);
  }
};

export default authenticationMW;
