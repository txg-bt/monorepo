import React from 'react';
import PropTypes from 'prop-types';
import { setPathPrefix } from './pathPrefix';
import { Routes, Route, generatePath } from 'react-router-dom';
import Restaurants from './containers/Restaurants';

const App = ({ userToken, path }) => {
  return <Restaurants userToken={userToken} />;
};

App.propTypes = {
  path: PropTypes.string,
  userToken: PropTypes.string,
};

App.defaultProps = {};

export default App;
