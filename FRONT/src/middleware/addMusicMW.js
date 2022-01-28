import axios from 'axios';
import { SUBMIT_SEARCH, saveResultsMusic } from 'src/actions/addMusic';

import { selectTypeMusic } from 'src/selectors/selectTypeMusic';
import { formatTracks } from 'src/selectors/formatMusic';

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
        url: `${corsReverseProxy}/${deezerAPIUrl}/search/${typeMusicString}?q=${searchMusic}&limit=6`,
      })
        .then(async (res) => {
          const resultsMusicFormated = await formatTracks(res.data.data);
          const actionSaveResultsMusic = saveResultsMusic(resultsMusicFormated);
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
