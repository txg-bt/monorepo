import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "rebass";
import { format } from "date-fns";
import axios from "axios";
import { API_URL } from "../../constants";
import Button from "@txg/button";
import { useTheme } from "styled-components";

function Reservation({
  restaurantId,
  restaurant_name,
  reservation_date,
  num_guests,
  status,
  reservation_id,
  refreshReservations,
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

  async function startUpdate(newStatus) {
    try {
      await axios.put(
        `${API_URL}/reservations/restaurant/${restaurantId}/${reservation_id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      alert("Reservation updated");
      refreshReservations();
    } catch (error) {
      console.log(error);
    }
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

      {status === "pending" && (
        <Flex flexGrow={0} alignItems={"center"} flexDirection={"column"}>
          <Button onClick={() => startUpdate("accepted")}>
            Accept reservation
          </Button>

          <Button
            onClick={() => startUpdate("rejected")}
            type="destructive"
            marginTop={"16px"}
          >
            Reject Reservation
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

Reservation.propTypes = {};

Reservation.defaultProps = {};

export default Reservation;
