/**
 * @file Auth API routes for users.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const VerifyUserMiddleware = require('../middleware/verify-user.middleware')
const ValidationMiddleware = require('../middleware/validate-user.middleware')
const AuthorizationController = require('../controllers/auth.controller')

exports.routesConfig = (app) => {
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
