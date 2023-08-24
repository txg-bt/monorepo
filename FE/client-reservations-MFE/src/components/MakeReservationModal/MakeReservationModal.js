import React, { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass';
import axios from 'axios';
import { API_URL } from '../../constants';
import PropTypes from 'prop-types';
import Input from '@txg/input';
import Button from '@txg/button';
import Modal from '@txg/modal';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTheme } from 'styled-components';

function MakeReservationModal({
  isOpen,
  restaurantId,
  onClose,
  name,
  existingTime,
  existingGuests,
  reservationId,
  isUpdate,
  refreshData,
  userToken,
}) {
  const theme = useTheme();
  const [time, setTime] = useState(Date.now() + 24 * 60 * 60 * 1000);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const tomorrow = Date.now() + 24 * 60 * 60 * 1000;

    setTime(existingTime ? new Date(existingTime) : tomorrow);
    setGuests(existingGuests || 1);
  }, [existingTime, existingGuests]);

  async function addFunction() {
    await axios.post(
      `${API_URL}/reservations/restaurant/${restaurantId}`,
      {
        reservation_date: time,
        num_guests: guests,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  }

  async function updateFunction() {
    await axios.put(
      `${API_URL}/reservations/user/${reservationId}`,
      {
        reservation_date: time,
        num_guests: guests,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  }

  async function makeReservation() {
    try {
      const func = isUpdate ? updateFunction : addFunction;

      await func();
    } catch (error) {
      alert(isUpdate ? 'Error updated reservation' : 'Error making reservation');
      return;
    }

    alert(isUpdate ? 'Reservation updated successfully' : 'Reservation made successfully');

    refreshData();
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Make a reservation at ${name}`}
        height={500}
        width={700}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Flex paddingTop={theme.spacing04} flexDirection={'column'}>
            <Flex alignItems={'center'}>
              <Flex width="200px">
                <Box>Select Time</Box>
              </Flex>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="yyyy-MM-dd HH:mm"
                ampmInClock={false}
                value={time}
                onChange={(value) => setTime(value?.getTime())}
              />
            </Flex>

            <Flex paddingTop={theme.spacing04}>
              <Flex width="200px">
                <Box>Number of guests</Box>
              </Flex>
              <Input value={guests} onChange={setGuests} type="number"></Input>
            </Flex>
          </Flex>
        </LocalizationProvider>
        <Flex
          marginTop="auto"
          justifyContent={'flex-end'}
          paddingTop={theme.spacing04}
          alignItems="center"
        >
          <Button onClick={makeReservation}>
            {isUpdate ? 'Update reservation' : 'Make Reservation'}
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

MakeReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  restaurantId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string,
  existingTime: PropTypes.any,
  existingGuests: PropTypes.number,
  reservationId: PropTypes.string,
  isUpdate: PropTypes.bool,
  refreshData: PropTypes.func,
};

MakeReservationModal.defaultProps = {
  refreshData: () => {},
};
export default MakeReservationModal;
