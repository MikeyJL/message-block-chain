/**
 * @file User API routes for nodes.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const ValidationMiddleware = require('../middleware/validate-user.middleware')
const NodeController = require('../controllers/node.controller')

exports.routesConfig = (app) => {
  app.post('/v1/init', [
    ValidationMiddleware.validateJWT,
    NodeController.init
  ])
}
