/**
 * @file Auth API routes for authentication.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import VerifyUserMiddleware from '../middleware/verify-user.middleware'
import ValidationMiddleware from '../middleware/validate-user.middleware'
import AuthorizationController from '../controllers/auth.controller'
import { Application } from 'express'

/**
 * Routes for auth endpoints.
 * @param {Application} app - The app instance.
 */
function routesConfig (app: Application) {
  app.post('/v1/auth', [
    VerifyUserMiddleware.checkAuthFields,
    VerifyUserMiddleware.isPasswordCorrect,
    AuthorizationController.login
  ])

  app.post('/v1/auth/refresh', [
    ValidationMiddleware.validateJWT,
    ValidationMiddleware.verifyRefreshData,
    ValidationMiddleware.validateRefreshToken,
    AuthorizationController.login
  ])
}

export default {
  routesConfig
}
