'use strict'
const request = require('request')

const forecast = (latitude, longitude, units, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f08b7b6956a0ed00c3d69a207a3e1ccd&query=' + latitude + ',' + longitude + '&units=' + units

  request({ url, json: true }, (error, response) => {

    if (error) {
      callback('Unable to connect to the weather service. Please try again later.', undefined)
    } else if (response.body.error) {
      callback('Unable to find location. Please try entering a new location.', undefined)
    } else {
      const current = response.body.current
      const location = response.body.location
      callback(undefined, {
        name: location.name,
        country: location.country,
        region: location.region,
        lat: location.lat,
        lon: location.lon,
        temp: current.temperature,
        feelsLike: current.feelslike,
        desc: current.weather_descriptions[0],
        forecastString: `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees. It feels like ${current.feelslike} degrees.`
      })
    }
  })
}

module.exports = forecast