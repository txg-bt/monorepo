import React from 'react';
import PropTypes from 'prop-types';

import { Routes, Route } from 'react-router-dom';
import Reservations from './containers/Reservations';

const App = ({ userToken, path }) => {
  return <Reservations userToken={userToken}/>
};

App.propTypes = {
  path: PropTypes.string,
  userToken: PropTypes.string,
};

App.defaultProps = {};

export default App;
