'use strict'

const path = require('path') // Node.js module
const express = require('express') // npm module
const hbs = require('hbs') // npm module
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebars.js as the default view engine
app.set('view engine', 'hbs')

// set handlebars.js views location to ROOT/templates
app.set('views', viewsPath) 

// register handlebars.js partials DIR
hbs.registerPartials(partialsPath)

// setup server static ROOT directory: /public
app.use(express.static(publicDirectoryPath))

// use handlebars.js template in /views/index.html
// NOTE: handlebars.js expects by default a ROOT/views directory
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike Butler'
  })
})

// about.hbs route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mike Butler'
  })
})

// help.hbs route
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mike Butler',
    message: 'Hi there, this is the help page, where you will find lots of helpful info about how to use this website.'
  })
})

// app.com/weather route
app.get('/weather', (req, res) => {

  // All query string key:value pairs are on req.query
  // EG. ?address=Bendigo,Australia&units=m (or f for farenheit)
  // client-side fetch() Web API sends a request to localhost:3000/weather?address=
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address!'
    })
  }

  geocode(req.query.address, (error, data={}) => {

    // destructure data object
    const {latitude:lat, longitude:lon} = data

    if (error) {
      console.log(error)
      return res.send({error})
    }
    console.log(data)
    const units = req.query.units || 'm'
    console.log(units)
    console.log(lat, lon)
    forecast(lat, lon, units, (error, forecast) => {
      if (error) { 
        return res.send({error})
      }
      res.send(forecast)
    })
  })
})

// 404 help route handler
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike Butler',
    errorMsg: 'Help page not found!'
  })
})

// 404 generic route handler
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike Butler',
    errorMsg: 'Page not found!'
  })

})

// localhost:3000 is common dev port (http port: 80)
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})