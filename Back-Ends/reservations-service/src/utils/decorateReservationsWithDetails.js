const axios = require("axios");
const RESTAURANTS_SERVICE = require("../../constants").RESTAURANTS_SERVICE;
const { logger } = require("./logger");

async function decorateReservationsWithDetails(reservations) {
  try {
    const restaurant_ids = reservations.map(
      (reservation) => reservation.restaurant_id
    );

    const result = await axios.post(`${RESTAURANTS_SERVICE}/restaurants/bulk`, {
      restaurant_ids: restaurant_ids,
    });

    const restaurants = result.data;

    logger({
      route: "/utils/decorateReservationsWithDetails",
      statusCode: 200,
      message: "reservations decorated successfully",
    });

    return reservations.map((reservation) => ({
      ...reservation,
      restaurant_name: restaurants.find(
        (restaurant) => restaurant.restaurant_id === reservation.restaurant_id
      )?.name,
    }));
  } catch (err) {
    logger({
      route: "/utils/decorateReservationsWithDetails",
      statusCode: 500,
      message: err.message,
    });
  }

  return reservations;
}

module.exports = decorateReservationsWithDetails;
