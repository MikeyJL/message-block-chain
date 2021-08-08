/**
 * @file User API routes for nodes.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import ValidationMiddleware from '../middleware/validate-user.middleware'
import NodeController from '../controllers/node.controller'
import { Application } from 'express'

/**
 * Routes for node endpoints.
 * @param {Application} app - The app instance.
 */
function routesConfig (app: Application) {
  app.post('/v1/nodes/init', [
    ValidationMiddleware.validateJWT,
    NodeController.initGenesis
  ])
  app.post('/v1/nodes', [
    ValidationMiddleware.validateJWT,
    NodeController.createNode
  ])
  app.get('/v1/nodes', [
    ValidationMiddleware.validateJWT,
    NodeController.getAllNodes
  ])
}

export default {
  routesConfig
}
