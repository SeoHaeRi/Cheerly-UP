import { combineReducers } from 'redux';
import user from './module/user';
import chatroom from './module/chatroom';
import auth from './module/token';

export default combineReducers({
  user,
  chatroom,
  auth
});
