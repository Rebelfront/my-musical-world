export const SAVE_USER = 'SAVE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECK = 'USER_CHECK';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: {
    ...user,
  },
});

export const checkUser = () => ({
  type: USER_CHECK,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
