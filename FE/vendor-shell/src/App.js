import React, { useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import themes from '@txg/theme';
import { Flex } from 'rebass';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { userTokenActions } from './store/slices/user';
import AuthHoc from './components/AuthHOC';
const SsoUI = React.lazy(() => import('sso_ui/App'));
const VendorRestaurants = React.lazy(() => import('vendor_restaurants_ui/App'));
const VendorReservations = React.lazy(() => import('vendor_reservations_ui/App'));

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    ${({ theme }) => theme.body};
  }
`;

const App = ({ isLightTheme, setToken, userToken }) => {
  const theme = themes.vendor[isLightTheme ? 'light' : 'dark'];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Flex height="100%" width="100%" flexDirection={'column'} backgroundColor={theme.surface01}>
          <NavBar />
          <Flex alignItems={'center'} justifyContent={'center'} flexGrow={1} width={'100%'}>
            <Routes path="/">
              <Route
                path="/auth/*"
                element={
                  <React.Suspense fallback="Loading...">
                    <SsoUI path="/auth" setToken={setToken} userToken={userToken} />
                  </React.Suspense>
                }
              ></Route>

              <Route
                path=""
                element={
                  <AuthHoc userToken={userToken}>
                    <React.Suspense fallback="Loading...">
                      <VendorRestaurants path="" userToken={userToken} />
                    </React.Suspense>
                  </AuthHoc>
                }
              ></Route>

              <Route
                path="/reservations/*"
                element={
                  <AuthHoc userToken={userToken}>
                    <React.Suspense fallback="Loading...">
                      <VendorReservations path="/reservations" userToken={userToken} />
                    </React.Suspense>
                  </AuthHoc>
                }
              ></Route>
              <Route path="*" element={<div>404</div>}></Route>
            </Routes>
          </Flex>
        </Flex>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isLightTheme: state.themeConfig.isLightTheme,
  userToken: state.userToken.token,
});

const mapDispatchProps = (dispatch) => ({
  setToken: bindActionCreators(userTokenActions.setToken, dispatch),
});

export default connect(mapStateToProps, mapDispatchProps)(App);
