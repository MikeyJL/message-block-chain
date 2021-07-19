/**
 * @file Checks the validity and verifies the refresh token provided.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

require('dotenv').config()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// --------------
// Exports
// --------------

/**
 * Checks if a refresh token is provided.
 * @param {object} req - The request.
 * @param {object} res - The response.
 * @param {function} next - Next function.
 */
exports.verifyRefreshData = (req, res, next) => {
  if (req.body && req.body.refreshToken) {
    return next()
  } else {
    return res.status(400).send({ error: 'Missing refreshToken' })
  }
}

/**
 * Checks if the refresh token is valid.
 * @param {object} req - The request.
 * @param {object} res - The response.
 * @param {function} next - Next function.
 */
exports.validateRefreshToken = (req, res, next) => {
  const refreshToken = Buffer.from(req.body.refreshToken, 'base64')
  const hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + process.env.JWT_SECRET).digest('base64')
  if (hash === refreshToken) {
    req.body = req.jwt
    return next()
  } else {
    return res.status(400).send({ error: 'Invalid refresh token' })
  }
}

/**
 * Checks and process the authorization header. Also checkes if the access token is correct before permitting use of the API.
 * @param {object} req - The request.
 * @param {object} res - The response.
 * @param {function} next - Next function.
 */
exports.validateJWT = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send({ error: 'Something went wrong' })
      } else {
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET)
        return next()
      }
    } catch (error) {
      res.status(403).send({ error })
    }
  } else {
    res.status(401).send({ error: 'Something went wrong' })
  }
}
