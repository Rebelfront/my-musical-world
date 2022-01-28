export const TOGGLE_ADD_MUSIC_MODAL = 'TOGGLE_ADD_MUSIC_MODAL';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
export const SAVE_RESULTS_MUSIC = 'SAVE_RESULTS_MUSIC';

export const toggleAddMusicModal = () => ({
  type: TOGGLE_ADD_MUSIC_MODAL,
});

export const submitAddMusic = (search) => ({
  type: SUBMIT_SEARCH,
  payload: {
    search,
  },
});

export const saveResultsMusic = (results) => ({
  type: SAVE_RESULTS_MUSIC,
  payload: results,
});
