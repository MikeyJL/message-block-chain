/**
 * @file Manages the authentication processes.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import crypto from 'crypto'
import { Request, Response } from 'express'
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Authenticates the user and sends the access and refresh tokens.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @returns A response.
 */
function login (req: Request, res: Response): Response | void {
  try {
    const refreshId = req.body.userId + process.env.JWT_SECRET
    const salt = crypto.randomBytes(16).toString('base64')
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64')
    req.body.refreshKey = salt
    const token = jwt.sign(req.body, process.env.JWT_SECRET)
    const refreshToken = Buffer.from(hash).toString('base64')
    res.status(201).send({
      accessToken: token,
      refreshToken
    })
  } catch (error) {
    res.status(500).send({ errors: error })
  }
}

/**
 * Creates and sends the refresh token.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @returns A response.
 */
function refreshToken (req: Request, res: Response): Response | void {
  try {
    req.body = req.body.jwt
    const token = jwt.sign(req.body, process.env.JWT_SECRET)
    res.status(201).send({ id: token })
  } catch (error) {
    res.status(500).send({ errors: error })
  }
}

export default {
  login,
  refreshToken
}
