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
const UsersRoutes = require('./routes/users.route')
const NodesRoutes = require('./routes/nodes.route')
const AuthorizationRoutes = require('./routes/auth.route')

// --------------
// Set-up
// --------------

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

// --------------
// Headers
// --------------

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

// --------------
// Routes
// --------------
UsersRoutes.routesConfig(app)
NodesRoutes.routesConfig(app)
AuthorizationRoutes.routesConfig(app)

app.listen(process.env.PORT, () => {
  console.log(`\nListening on port ${process.env.PORT}`)
})
