/* eslint-disable import/prefer-default-export */
export const selectTypeMusic = (value) => {
  let typeMusicString;
  switch (value) {
    case 1:
      typeMusicString = 'track';
      break;
    case 2:
      typeMusicString = 'album';
      break;
    case 3:
      typeMusicString = 'artist';
      break;
    default:
      break;
  }
  return typeMusicString;
};
