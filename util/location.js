const axios = require("axios");

const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_KEY}`
  );

  const data = response.data;

  if (!data) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const result = data.features[0].center;

  const coordinates = {
    lng: result[0],
    lat: result[1],
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
