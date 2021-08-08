/**
 * @file Checks the validity and verifies the refresh token provided.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Checks if a refresh token is provided.
 * @param {string} req.body.refreshToken - The refresh token.
 * @param {Response} res - The response.
 * @param {function} next - Next function.
 * @returns A response.
 */
function verifyRefreshData (req: Request, res: Response, next: NextFunction): Response | void {
  if (req.body && req.body.refreshToken) {
    return next()
  } else {
    return res.status(400).send({ error: 'Missing refreshToken' })
  }
}

/**
 * Checks if the refresh token is valid.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @param {function} next - Next function.
 * @returns A response.
 */
function validateRefreshToken (req: Request, res: Response, next: NextFunction): Response | void {
  const refreshToken = Buffer.from(req.body.refreshToken, 'base64')
  const hash = crypto.createHmac('sha512', req.body.jwt.refreshKey).update(req.body.jwt.userId + process.env.JWT_SECRET).digest('base64')
  if (Buffer.from(hash) === refreshToken) {
    return next()
  } else {
    return res.status(400).send({ error: 'Invalid refresh token' })
  }
}

/**
 * Checks and process the authorization header. Also checks if the access token is correct before permitting use of the API.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @param {NextFunction} next - Next function.
 * @returns A response.
 */
function validateJWT (req: Request, res: Response, next: NextFunction): Response | void {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send({ error: 'Missing authentication header' })
      } else {
        req.body.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET)
        return next()
      }
    } catch {
      res.status(403).send({ error: 'Unauthorised access' })
    }
  } else {
    res.status(401).send({ error: 'Missing authentication header' })
  }
}

export default {
  verifyRefreshData,
  validateRefreshToken,
  validateJWT
}
