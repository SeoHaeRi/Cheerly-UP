import { combineReducers } from 'redux';
import user from './module/user';
import chatroom from './module/chatroom';

export default combineReducers({
  user,
  chatroom,
});
