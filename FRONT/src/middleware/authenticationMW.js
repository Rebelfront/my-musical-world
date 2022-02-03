/* eslint-disable no-lone-blocks */
import axios from 'axios';
import { SUBMIT_LOGIN } from 'src/actions/login';
import { SUBMIT_SIGNUP } from 'src/actions/signup';
import { signupFailure, openSignUpModal } from 'src/actions/signup';
import {
  saveUser, USER_LOGOUT, USER_CHECK, setActionLogged,
} from 'src/actions/user';

const authenticationMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case USER_CHECK:
      const token = localStorage.getItem('token');
      if (token) {
        axios({
          method: 'get',
          url: `${rootAPIUrl}/user`,
          headers: {
            // Je mets mon token dans le header "Authorization"
            Authorization: token,
          },
        })
          .then((res) => {
            const userSaveAction = saveUser(res.data);
            store.dispatch(userSaveAction);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      break;
    case SUBMIT_LOGIN: {
      // double destructuration
      const { login: { mail, password } } = store.getState();

      axios.post(`${rootAPIUrl}/login`, {
        mail,
        password,
      })
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
          const actionLogged = setActionLogged(res.data);
          store.dispatch(actionLogged);
        })
        .catch((err) => console.log(err));
    }
      break;
    case SUBMIT_SIGNUP: {
      const {
        signup: {
          mail, pseudo, firstname, lastname, password,
        },
      } = store.getState();

      axios.post(`${rootAPIUrl}/signup`, {
        mail,
        pseudo,
        firstname,
        lastname,
        password,
      })
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
          const actionLogged = setActionLogged(res.data);
          store.dispatch(actionLogged);
        })
        .catch((err) => {
          console.log(err);
          const action = signupFailure(err.message);
          const openModal = openSignUpModal();
          store.dispatch(action);
          store.dispatch(openModal);
        });

    }
      break;
    case USER_LOGOUT: {
      next(action);
      localStorage.removeItem('token');
    }
      break;
    default:
      next(action);
  }
};

export default authenticationMW;
