import { TOGGLE_ADD_MUSIC_MODAL, SAVE_RESULTS_MUSIC } from '../actions/addMusic';
import { CHANGE_INPUT } from '../actions';

const initialState = {
  modalOpened: false,
  searchMusic: '',
  typeMusic: 1, // 1 - Titre, 2 - Album, 3 - Artiste
  resultsMusic: '',
};

const addMusic = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ADD_MUSIC_MODAL:
      return {
        ...state,
        modalOpened: !state.modalOpened,
        searchMusic: '',
      };
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case SAVE_RESULTS_MUSIC:
      return {
        ...state,
        searchMusic: '',
        resultsMusic: action.payload.results,
      };
    default:
      return state;
  }
};

export default addMusic;
