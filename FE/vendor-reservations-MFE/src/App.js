import React from 'react';
import PropTypes from 'prop-types';

import { Routes, Route, generatePath } from 'react-router-dom';
import Reservations from './containers/Reservations';

const App = ({ userToken, path }) => {
  const cleanedPath = generatePath(path);

  return (
    <Routes>
      <Route
        key={'reservations'}
        path={`/:restaurantId`}
        element={<Reservations userToken={userToken} />}
      ></Route>
    </Routes>
  );
};

App.propTypes = {
  path: PropTypes.string,
  userToken: PropTypes.string,
};

App.defaultProps = {};

export default App;
