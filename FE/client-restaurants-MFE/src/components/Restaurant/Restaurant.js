import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import Button from '@txg/button';
import { useTheme } from 'styled-components';

function Restaurant({
  name,
  city,
  address,
  phone_number,
  restaurant_id,
  makeReservation,
  userToken,
}) {
  const theme = useTheme();

  function openReservationModal() {
    makeReservation(restaurant_id, name);
  }

  return (
    <Flex
      backgroundColor={theme.surface02}
      padding={theme.spacing05}
      marginBottom={theme.spacing04}
      justifyContent={'space-between'}
    >
      <Flex flexDirection={'column'}>
        <Flex color={theme.textColor01}>Resturant name: {name}</Flex>
        <Flex color={theme.textColor01}>City: {city}</Flex>
        <Flex color={theme.textColor01}>Adress: {address}</Flex>
        <Flex color={theme.textColor01}>Phone Number: {phone_number}</Flex>
      </Flex>

      <Flex flexGrow={0} alignItems={'center'}>
        <Button onClick={openReservationModal}>Make a reservation</Button>
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
  makeReservation: PropTypes.func.isRequired,
};

Restaurant.defaultProps = {};

export default Restaurant;
