import axios from 'axios';
import { SUBMIT_LOGIN } from '../actions/login';
import { saveUser } from '../actions/user';

const authenticationMW = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // double destructuration
      const { login: { email, password } } = store.getState();

      axios.post('http://localhost:3001/login', {
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
    default:
      next(action);
  }
};

export default authenticationMW;
