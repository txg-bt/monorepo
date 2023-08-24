import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { combinedReducers } from './slices/combineReducers';
import loggerMiddleware from './middlewares/logger';

const persistConfig = {
  key: 'root',
  storage,
};

export function createStore() {
  return configureStore({
    reducer: persistReducer(persistConfig, combinedReducers),
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === 'development'
        ? getDefaultMiddleware({ serializableCheck: false }).concat(loggerMiddleware)
        : getDefaultMiddleware(),
  });
}
