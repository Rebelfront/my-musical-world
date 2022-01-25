import axios from 'axios';
import { SUBMIT_MODIFIED_PROFILE } from 'src/actions/profile';
import { saveUser } from 'src/actions/user';

const authenticationMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case SUBMIT_MODIFIED_PROFILE: {

      axios.post(`${rootAPIUrl}/user`, action.payload)
        .then((res) => {
          console.log(res.data);
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
    default:
      next(action);
  }
};

export default authenticationMW;
