/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import axios from 'axios';
import { API_URL } from '../../constants';
import Restaurant from '../../components/Restaurant';
import AddOrUpdateRestaurant from '../../components/AddOrUpdateRestaurant';
import { useTheme } from 'styled-components';
import Button from '@txg/button';

function Restaurants({ userToken }) {
  const theme = useTheme();

  const [restaurants, setRestaurants] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  async function getRestaurants() {
    try {
      const result = await axios.get(`${API_URL}/restaurants/vendor`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setRestaurants(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  function closeModal() {
    setIsAddOpen(false);
    setActiveRestaurant({});
  }

  function addRestaurant() {
    setIsAddOpen(true);
  }

  return (
    <>
      <AddOrUpdateRestaurant
        userToken={userToken}
        isOpen={!!activeRestaurant?.name || isAddOpen}
        onClose={closeModal}
        restaurant={{ ...activeRestaurant }}
        refreshData={getRestaurants}
      />

      <Flex
        width={'100%'}
        height="100%"
        flexDirection={'column'}
        overflow={'auto'}
        backgroundColor={theme.surface01}
        color={theme.textColor01}
      >
        <Flex
          width={'100%'}
          justifyContent={'flex-end'}
          position="sticky"
          top="0"
          marginTop={theme.spacing03}
        >
          <Button onClick={addRestaurant}>Add Restaurant</Button>
        </Flex>
        <Flex width={'80%'} paddingLeft={'10%'} height="100%" flexDirection={'column'}>
          {restaurants?.map((restaurant) => (
            <Restaurant
              key={restaurant.restaurant_id}
              {...restaurant}
              onEdit={() => setActiveRestaurant(restaurant)}
            />
          ))}

          {restaurants.length === 0 && (
            <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <Box>No restaurants found</Box>
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
