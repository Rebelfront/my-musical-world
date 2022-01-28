import { TOGGLE_ADD_MUSIC_MODAL } from '../actions/addMusic';

const initialState = {
  modalOpened: false,
};

const addMusic = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ADD_MUSIC_MODAL:
      return {
        ...state,
        modalOpened: !state.modalOpened,
      };
    default:
      return state;
  }
};

export default addMusic;
