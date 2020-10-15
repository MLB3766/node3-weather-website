'use strict'
const weatherForm = document.querySelector('#search-form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = e.target.elements.searchInput.value

  // clear messages
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  // SERVER-SIDE: Node.js handler listens @ localhost:3000/weather for requests 
  // retrieve query string request from fetch() and sends a response
  //
  // CLIENT-SIDE: Web API fetch() async handler 
  // 1. sends request to localhost:3000/weather
  // 2. retrieves JSON data via server handler response
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {

      // fetch data from Node.js backend: geocode and forecast modules
      if(data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = `${data.name}, ${data.region}, ${data.country}.`
        messageTwo.textContent = `${data.forecastString}`
      }
  })
})