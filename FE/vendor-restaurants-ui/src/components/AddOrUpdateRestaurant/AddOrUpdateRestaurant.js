import React, { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass';
import axios from 'axios';
import { API_URL } from '../../constants';
import PropTypes from 'prop-types';
import Input from '@txg/input';
import Modal from '@txg/modal';
import Button from '@txg/button';
import { useTheme } from 'styled-components';

function AddOrUpdateRestaurant({ userToken, isOpen, onClose, restaurant, refreshData }) {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isUpdate = !!restaurant?.name;

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setCity(restaurant.city);
      setAddress(restaurant.address);
      setPhoneNumber(restaurant.phone_number);
    }
  }, [restaurant?.name, restaurant?.city, restaurant?.address, restaurant?.phone_number]);

  async function addFunction() {
    await axios.post(
      `${API_URL}/restaurants/`,
      {
        name,
        city,
        address,
        phone_number: phoneNumber,
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
      `${API_URL}/restaurants/${restaurant.restaurant_id}`,
      {
        name,
        city,
        address,
        phone_number: phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  }

  async function deleteRestaurant() {
    try {
      await axios.delete(`${API_URL}/restaurants/${restaurant.restaurant_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      alert('Deleted Restaurant');

      refreshData();
      onClose();
    } catch (error) {
      alert('error Deleting');
      return;
    }
  }

  async function addOrUpdate() {
    try {
      const func = isUpdate ? updateFunction : addFunction;

      await func();
    } catch (error) {
      alert(isUpdate ? 'Error updated restaurant' : 'Error adding restaurant');
      return;
    }

    alert(isUpdate ? 'Restaurant updated successfully' : 'Restaurant made successfully');

    refreshData();
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={isUpdate ? 'Update Restaurant' : 'Add Restaurant'}
        onClose={onClose}
        height={500}
        width={700}
      >
        <Flex paddingTop="16px" flexDirection={'column'}>
          {/* name, city, address, phone_number */}

          <Flex paddingTop={'16px'}>
            <Flex width="200px">
              <Box>Name</Box>
            </Flex>
            <Input value={name} onChange={setName} type="text"></Input>
          </Flex>

          <Flex paddingTop={'16px'}>
            <Flex width="200px">
              <Box>City</Box>
            </Flex>
            <Input value={city} onChange={setCity} type="text"></Input>
          </Flex>

          <Flex paddingTop={'16px'}>
            <Flex width="200px">
              <Box>Address</Box>
            </Flex>
            <Input value={address} onChange={setAddress} type="text"></Input>
          </Flex>

          <Flex paddingTop={'16px'}>
            <Flex width="200px">
              <Box>Phone Number</Box>
            </Flex>
            <Input value={phoneNumber} onChange={setPhoneNumber} type="tel"></Input>
          </Flex>
        </Flex>

        <Flex
          marginTop="auto"
          justifyContent={'flex-end'}
          paddingTop={theme.spacing04}
          alignItems="center"
        >
          {!!restaurant && (
            <Button type="destructive" onClick={deleteRestaurant} marginRight={theme.spacing04}>
              Delete Restaurant
            </Button>
          )}

          <Button onClick={addOrUpdate}>
            {isUpdate ? 'Update restaurant' : 'Create Restaurant'}
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

AddOrUpdateRestaurant.propTypes = {};

AddOrUpdateRestaurant.defaultProps = {
  refreshData: () => {},
};
export default AddOrUpdateRestaurant;
