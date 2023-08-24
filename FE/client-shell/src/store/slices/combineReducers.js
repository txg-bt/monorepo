import { combineReducers } from 'redux';

import themeReducer from './themeSlice';
import userReducer from './user';

export const combinedReducers = combineReducers({
  themeConfig: themeReducer,
  userToken: userReducer,
});
