'use strict'
const request = require('request')
// Geocoding using: Mapbox Geocoding API
// forward geocoding: location -> JSON string geo object
// places/Los Angeles
// options: limit=1, language=en
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWxiMzc2NiIsImEiOiJja2Zqa245ZWwxam9nMnhsbW94N3AzOW15In0.PMjdhpRqRsckgNKA5qTKDQ&limit=1&language=en`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the location services. Please try again later.', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find the geolocation. Please try entering a new location.', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode