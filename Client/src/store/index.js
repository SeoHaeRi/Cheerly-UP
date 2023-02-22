import { combineReducers } from 'redux';
import user from './module/user';
import chatroom from './module/chatroom';
import token from './module/token';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  //session storage에 저장
  storage: storageSession,
  whitelist: ['token'],
};

export const rootReducer = combineReducers({
  user,
  chatroom,
  token,
});

export default persistReducer(persistConfig, rootReducer);
