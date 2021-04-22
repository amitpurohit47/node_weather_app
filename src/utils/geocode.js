const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW1pdHB1cm9oaXQ0NyIsImEiOiJja243aHlzeWgwODI2Mm9tcTFoYml0Y3JzIn0.ABoiyKSzHY91YZsL3ozkKA&limit=1";

  request({ url, json: true }, (err, {body}={}) => {
    if (err) {
      callback("Unable to connect with geocoding service", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found", undefined);
    } else {
      const data = {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
