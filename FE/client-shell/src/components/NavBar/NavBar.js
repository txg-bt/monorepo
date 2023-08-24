import React from 'react';
import { Flex } from 'rebass';
import { Container, Image } from './NavBar.styled';
import { useTheme } from 'styled-components';
import User from './user.png';
import Sun from './sun.png';
import Moon from './moon.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Restaurant from './restaurant.png';
import Reservation from './reservation.png';
import { themeActions } from '../../store/slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import { userTokenActions } from '../../store/slices/user';

function NavBar({ toggleTheme, isLightTheme, setToken }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const isOnRestaurantPage = window.location.pathname === '/';

  return (
    <Container>
      <Flex {...theme.heading} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Awesome Restaurant Management
      </Flex>
      <Flex>
        {isOnRestaurantPage ? (
          <Image src={Reservation} onClick={() => navigate('/reservations')} />
        ) : (
          <Image src={Restaurant} onClick={() => navigate('/')} />
        )}

        <Image src={User} onClick={() => setToken(null)} />

        <Image src={isLightTheme ? Sun : Moon} onClick={toggleTheme} />
      </Flex>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLightTheme: state.themeConfig.isLightTheme,
});

const mapDispatchProps = (dispatch) => ({
  toggleTheme: bindActionCreators(themeActions.toggleTheme, dispatch),
  setToken: bindActionCreators(userTokenActions.setToken, dispatch),
});

export default connect(mapStateToProps, mapDispatchProps)(NavBar);
