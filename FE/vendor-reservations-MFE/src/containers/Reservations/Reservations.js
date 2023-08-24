/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

import { Flex, Box } from 'rebass';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import Reservation from '../../components/Reservation';
import { useTheme } from 'styled-components';

function Reservations({ userToken }) {
  const { restaurantId } = useParams();
  const theme = useTheme();

  const [reservations, setReservations] = useState([]);

  async function getReservations() {
    try {
      const result = await axios.get(`${API_URL}/reservations/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setReservations(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <Flex
        width={'100%'}
        height="100%"
        flexDirection={'column'}
        overflow={'auto'}
        color={theme.textColor03}
        backgroundColor={theme.surface01}
        paddingTop={theme.spacing04}
      >
        <Flex
          width={'80%'}
          paddingLeft={'10%'}
          height="100%"
          flexDirection={'column'}
          paddingTop={theme.spacing04}
        >
          {reservations?.map((reservation) => (
            <Reservation
              key={reservation.reservation_id}
              {...reservation}
              restaurantId={restaurantId}
              refreshReservations={getReservations}
              userToken={userToken}
            />
          ))}

          {reservations.length === 0 && (
            <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <Box>No reservations found</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

Reservations.propTypes = {};

Reservations.defaultProps = {};

export default Reservations;
