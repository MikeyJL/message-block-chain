/**
 * @file Initiates the api and prepares all the resources.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import UsersRoutes from './routes/users.route'
import NodesRoutes from './routes/nodes.route'
import AuthorizationRoutes from './routes/auth.route'
import { NextFunction, Request, Response } from 'express'
const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()

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

app.use((req: Request, res: Response, next: NextFunction) => {
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
