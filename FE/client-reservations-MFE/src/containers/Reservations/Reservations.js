/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

import { Flex, Box } from 'rebass';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import Reservation from '../../components/Reservation';
import { useTheme } from 'styled-components';
import MakeReservationModal from '../../components/MakeReservationModal';

function Reservations({ userToken }) {
  const theme = useTheme();

  const [reservations, setReservations] = useState([]);
  const [activeReservation, setActiveReservation] = useState();

  async function getReservations() {
    try {
      const result = await axios.get(`${API_URL}/reservations/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setReservations(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setActiveReservation(null);
  }

  useEffect(() => {
    getReservations();
  }, []);

  function updateReservation(
    restaurant_name,
    reservation_date,
    num_guests,
    status,
    reservation_id,
  ) {
    setActiveReservation({
      reservation_date,
      num_guests,
      status,
      reservation_id,
      restaurant_name,
    });
  }

  return (
    <>
      <MakeReservationModal
        isOpen={!!activeReservation}
        onClose={closeModal}
        name={activeReservation?.restaurant_name}
        existingTime={activeReservation?.reservation_date}
        existingGuests={activeReservation?.num_guests}
        reservationId={activeReservation?.reservation_id}
        isUpdate
        refreshData={getReservations}
        userToken={userToken}
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
          width={'80%'}
          paddingLeft={'10%'}
          height="100%"
          flexDirection={'column'}
          paddingTop={theme.spacing06}
        >
          {reservations?.map((reservation) => (
            <Reservation
              key={reservation.reservation_id}
              {...reservation}
              updateReservation={updateReservation}
              triggerUpdate={getReservations}
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
