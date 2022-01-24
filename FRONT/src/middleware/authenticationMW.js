import axios from 'axios';
import { SUBMIT_LOGIN } from 'src/actions/login';
import { SUBMIT_SIGNUP } from 'src/actions/signup';
import { saveUser } from 'src/actions/user';

const authenticationMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // double destructuration
      const { login: { email, password } } = store.getState();

      axios.post(`${rootAPIUrl}/login`, {
        email,
        password,
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
          const fakeUser = {
            email: 'marty@oclock.io',
            lastname: 'MacFly',
            firstname: 'Marty',
            pseudo: 'Doc',
          };
          const actionSaveUser = saveUser(fakeUser);
          store.dispatch(actionSaveUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    case SUBMIT_SIGNUP: {
      const { signup: { email, pseudo, firstname, lastname, password } } = store.getState();

      axios.post(`${rootAPIUrl}/signup`, {
        email,
        pseudo,
        firstname,
        lastname,
        password,
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
          const fakeUser = {
            email: 'marty@oclock.io',
            lastname: 'MacFly',
            firstname: 'Marty',
            pseudo: 'Doc',
          };
          const actionSaveUser = saveUser(fakeUser);
          store.dispatch(actionSaveUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    default:
      next(action);
  }
};

export default authenticationMW;
