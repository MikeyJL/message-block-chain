/**
 * @file Initiates the api and prepares all the resources.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')

const UsersRoutes = require('./routes/users.routes')

const app = express()

app.use(bodyParser.urlencoded())
UsersRoutes.routesConfig(app)

app.listen(process.env.PORT, () => {
  console.log(`\nListening on port ${process.env.PORT}`)
})
