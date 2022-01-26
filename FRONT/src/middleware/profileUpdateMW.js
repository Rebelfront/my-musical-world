import axios from 'axios';
import { SUBMIT_MODIFIED_PROFILE } from 'src/actions/profile';
import { saveUser } from 'src/actions/user';

const profileUpdateMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case SUBMIT_MODIFIED_PROFILE: {
      const token = localStorage.getItem('token');
      axios({
        method: 'patch',
        url: `${rootAPIUrl}/user`,
        headers: {
          // Je mets mon token dans le header "Authorization"
          Authorization: token,
        },
        data: action.payload,
      })
        .then((res) => {
          console.log(res.data);
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

export default profileUpdateMW;
