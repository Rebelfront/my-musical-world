import axios from 'axios';
import { SUBMIT_SEARCH } from 'src/actions/addMusic';

const addMusicMW = (store) => (next) => (action) => {
  // url reverse proxy to allow cors deezer api
  const corsReverseProxy = 'https://cors--reverse--proxy.herokuapp.com';

  const deezerAPIUrl = 'https://api.deezer.com';

  switch (action.type) {
    case SUBMIT_SEARCH: {
      console.log(action.payload.search);
      const searchMusic = action.payload.search;
      axios({
        method: 'get',
        url: `${corsReverseProxy}/${deezerAPIUrl}/search/track?q=${searchMusic}`,
      })
        .then((res) => {
          // const actionSaveUser = saveUser(res.data);
          // store.dispatch(actionSaveUser);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
      break;
    default:
      next(action);
  }
};

export default addMusicMW;
