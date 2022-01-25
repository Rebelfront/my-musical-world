import { combineReducers } from 'redux';

import login from './login';
import signup from './signup';
import user from './user';
import header from './header';

export default combineReducers({
  login,
  signup,
  user,
  header,
});
