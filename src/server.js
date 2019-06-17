'use strict'

// Environment Configurations
import { environment, config } from './config/environment'

// Libraries import
import "babel-polyfill"
import bodyParser from 'body-parser'
import express from 'express'
import color from 'colors/safe'

// Middleware imports
import { apiProtocol } from './middleware/api-protocol'

// Router imports
import roadRouter from './app/routes/roads'

// Initialize Express Server
const server = express()

// Using bodyParser middlewares
server.use(bodyParser.json())
server.use(apiProtocol)

// Routes
server.use('/api/roads', roadRouter)

// Use logger in development
if (environment == "development") {
  const logger = require("morgan-body")
  logger(server, {
    logRequestBody: true,
    logResponseBody: false,
  })
}

// Server listen
server.listen(config.port, (req, res) => {
  console.log(color.green('Server is up on port ' + config.port));
})

// Prevent Heroku Production from sleeping
var http = require('http')
setInterval(() => {
  http.get('http://perfilometer-go.herokuapp.com')
}, 300000) // Make a request every 5 minutes