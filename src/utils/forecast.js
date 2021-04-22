const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fd3a7a9ee4e01fb84f297a9bebbf0d73&query=" +
    lattitude +
    "," +
    longitude;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Can't reach the weather service!", undefined);
    } else if (res.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = res.body.current;
      console.log(data);
      callback(
        undefined,
        `The weather seems ${data.weather_descriptions[0]}. 
        It is currently ${data.temperature} degree celcius. 
        It feels like is ${data.feelslike} degrees. 
        Humidity is ${data.humidity}%`
      );
    }
  });
};

module.exports = forecast;
