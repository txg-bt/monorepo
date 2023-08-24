import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "rebass";
import { format } from "date-fns";
import axios from "axios";
import { API_URL } from "../../constants";
import Button from "@txg/button";
import { useTheme } from "styled-components";

function Reservation({
  restaurant_name,
  reservation_date,
  num_guests,
  status,
  reservation_id,
  updateReservation,
  triggerUpdate,
  userToken,
}) {
  const theme = useTheme();

  function computeColor() {
    if (new Date(reservation_date) < new Date()) {
      return theme.surface02;
    }

    if (status === "pending") {
      return theme.warningColor;
    }

    if (status === "accepted") {
      return theme.active01;
    }

    if (status === "rejected") {
      return theme.errorColor;
    }
  }

  async function deleteReservation() {
    // send user token
    // send reservation id
    try {
      await axios.delete(`${API_URL}/reservations/user/${reservation_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      triggerUpdate();
      alert("Reservation deleted successfully");
    } catch (error) {
      alert("Error deleting reservation");
      return;
    }
  }

  function startUpdate() {
    updateReservation(
      restaurant_name,
      reservation_date,
      num_guests,
      status,
      reservation_id
    );
  }

  return (
    <Flex
      backgroundColor={computeColor()}
      padding="20px"
      marginBottom="16px"
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"}>
        <Flex>Resturant name: {restaurant_name}</Flex>
        <Flex>
          Reservation date:{" "}
          {format(new Date(reservation_date), "yyyy-MM-dd HH:mm")}
        </Flex>
        <Flex>Number of guests: {num_guests}</Flex>
        <Flex>Status: {status}</Flex>
      </Flex>

      <Flex flexGrow={0} alignItems={"center"} flexDirection={"column"}>
        <Button onClick={startUpdate}>Update</Button>

        <Button
          onClick={deleteReservation}
          type="destructive"
          backgroundColor={"red"}
          style={{ marginTop: theme.spacing04 }}
        >
          Delete reservation
        </Button>
      </Flex>
    </Flex>
  );
}

Reservation.propTypes = {};

Reservation.defaultProps = {};

export default Reservation;
