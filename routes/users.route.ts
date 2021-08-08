/**
 * @file User API routes for users.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import ValidationMiddleware from '../middleware/validate-user.middleware'
import UserController from '../controllers/user.controller'
import { Application } from 'express'

function routesConfig (app: Application) {
  app.post('/v1/users', [UserController.createUser])
  app.get('/v1/users/:email', [
    ValidationMiddleware.validateJWT,
    UserController.findByEmail
  ])
  app.put('/v1/users/:email', [
    ValidationMiddleware.validateJWT,
    UserController.updateDetails
  ])
}

export default {
  routesConfig
}
