/**
 * @file User API routes for users.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const ValidationMiddleware = require('../middleware/validate-user.middleware')
const UserController = require('../controllers/user.controller')

exports.routesConfig = (app) => {
  app.post('/v1/users', [UserController.createUser])
  app.get('/v1/users/:email', [
    ValidationMiddleware.validateJWT,
    UserController.findByEmail
  ])
  app.put('/v1/users/:id', [
    ValidationMiddleware.validateJWT,
    UserController.updateDetails
  ])
}
