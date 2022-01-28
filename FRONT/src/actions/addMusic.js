export const TOGGLE_ADD_MUSIC_MODAL = 'TOGGLE_ADD_MUSIC_MODAL';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

export const toggleAddMusicModal = () => ({
  type: TOGGLE_ADD_MUSIC_MODAL,
});

export const submitAddMusic = (search) => ({
  type: SUBMIT_SEARCH,
  payload: {
    search,
  },
});
