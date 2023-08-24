import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import App from './App';

function Root() {
  const store = createStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App></App>
      </PersistGate>
    </Provider>
  );
}

Root.propTypes = {};

Root.defaultProps = {};

export default Root;
