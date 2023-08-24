/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import axios from 'axios';
import { API_URL } from '../../constants';
import Restaurant from '../../components/Restaurant';
import { useTheme } from 'styled-components';
import Button from '@txg/button';
import MakeReservationModal from '../../components/MakeReservationModal';
import Input from '@txg/input';

function Restaurants({ userToken }) {
  const theme = useTheme();

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const result = await axios.get(`${API_URL}/restaurants?city=${search}`);

      setRestaurants(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function openReservationModal(restaurant_id, name) {
    setActiveRestaurant({ restaurant_id, name });
  }

  function closeModal() {
    setActiveRestaurant(null);
  }

  return (
    <>
      <MakeReservationModal
        isOpen={!!activeRestaurant}
        onClose={closeModal}
        restaurantId={activeRestaurant?.restaurant_id}
        name={activeRestaurant?.name}
        backgroundColor={theme.surface01}
        color={theme.textColor01}
        userToken={userToken}
      />

      <Flex
        width={'100%'}
        height="100%"
        flexDirection={'column'}
        overflow={'auto'}
        backgroundColor={theme.surface01}
      >
        <Flex
          width={'80%'}
          openReservationModal
          paddingLeft={'10%'}
          height="100%"
          flexDirection={'column'}
        >
          <Flex width={'100%'} justifyContent={'center'} flexShrink={0}>
            <Flex py="16px" width="50%" flexShrink={0}>
              <Input placeholder="Search by city" onChange={setSearch} value={search} />

              <Button onClick={getRestaurants} flexShrink={0}>
                Search
              </Button>
            </Flex>
          </Flex>

          {restaurants?.map((restaurant) => (
            <Restaurant
              key={restaurant.restaurant_id}
              {...restaurant}
              makeReservation={openReservationModal}
              userToken={userToken}
            />
          ))}

          {restaurants.length === 0 && (
            <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <Box color={theme.textColor01}>No restaurants found</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

Restaurants.propTypes = {
  userToken: PropTypes.string.isRequired,
};

Restaurants.defaultProps = {};

export default Restaurants;
