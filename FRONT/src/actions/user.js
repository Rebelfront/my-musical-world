export const SAVE_USER = 'SAVE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: {
    ...user,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
