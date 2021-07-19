/**
 * @file User API routes for users.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const UserController = require('../controllers/user.controller')

exports.routesConfig = (app) => {
  app.post('/v1/users', [UserController.createUser])
}
