import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '@txg/button';

function Restaurant({ name, city, address, phone_number, restaurant_id, onEdit }) {
  const theme = useTheme();
  const navigate = useNavigate();

  function seeReservations() {
    navigate(`/reservations/${restaurant_id}`);
  }

  return (
    <Flex
      backgroundColor={theme.surface02}
      color={theme.textColor01}
      padding={theme.spacing05}
      marginBottom={theme.spacing04}
      justifyContent={'space-between'}
    >
      <Flex flexDirection={'column'}>
        <Flex>Resturant name: {name}</Flex>
        <Flex>City: {city}</Flex>
        <Flex>Adress: {address}</Flex>
        <Flex>Phone Number: {phone_number}</Flex>
      </Flex>

      <Flex flexGrow={0} alignItems={'center'} flexDirection={'column'}>
        <Button onClick={onEdit}>Edit Restaurant</Button>

        <Button onClick={seeReservations} style={{ marginTop: theme.spacing04 }}>
          See reservations
        </Button>
      </Flex>
    </Flex>
  );
}

Restaurant.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  restaurant_id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Restaurant.defaultProps = {};

export default Restaurant;
