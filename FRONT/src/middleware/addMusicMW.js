import axios from 'axios';
import { SUBMIT_SEARCH, saveResultsMusic } from 'src/actions/addMusic';

import { selectTypeMusic } from 'src/selectors/selectTypeMusic';

const addMusicMW = (store) => (next) => (action) => {
  // url reverse proxy to allow cors deezer api
  const corsReverseProxy = 'https://cors--reverse--proxy.herokuapp.com';

  const deezerAPIUrl = 'https://api.deezer.com';

  switch (action.type) {
    case SUBMIT_SEARCH: {
      const { addMusic: { searchMusic, typeMusic } } = store.getState();
      const typeMusicString = selectTypeMusic(typeMusic);
      axios({
        method: 'get',
        url: `${corsReverseProxy}/${deezerAPIUrl}/search/${typeMusicString}?q=${searchMusic}&limit=10`,
      })
        .then((res) => {
          const actionSaveResultsMusic = saveResultsMusic(res.data.data);
          store.dispatch(actionSaveResultsMusic);
        })
        .catch((err) => console.log(err));
    }
      break;
    default:
      next(action);
  }
};

export default addMusicMW;
