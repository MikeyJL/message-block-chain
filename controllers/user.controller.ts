/**
 * @file A controller for the user data.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import crypto from 'crypto'
import db from '../services/db'
import { Request, Response } from 'express'
import { SQLiteError, User } from '../types'

/**
 * Creates a new user.
 * @param {string} req.body.firstName - The user's first name.
 * @param {string} req.body.lastName - The user's last name.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {Response} res - The response.
 * @returns The new user's id.
 */
function createUser (req: Request, res: Response): Response | void {
  const salt = crypto.randomBytes(16).toString('base64')
  const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
  req.body.password = `${salt}$${hash}`
  const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)'
  const params = [req.body.firstName, req.body.lastName, req.body.email, req.body.password]
  db.run(sql, params, (err: SQLiteError) => {
    if (err) {
      switch (err.errno) {
        case 19:
          res.status(400).send('Email already in use')
          break
        default:
          res.status(400).send('Something went wrong')
          break
      }
    } else {
      res.status(201).send('Done')
    }
  })
}

/**
 * Finds a user by email.
 * @param {string} req.body.email - The user's email.
 * @param {Response} res - The response.
 * @returns The new user's id.
 */
function findByEmail (req: Request, res: Response): Response | void {
  const sql = 'SELECT * FROM users WHERE email = ?'
  const params = [req.params.email]
  db.all(sql, params, (err: Error, result: Array<User>) => {
    if (err) {
      res.status(400).send('Something went wrong')
    } else {
      res.status(200).send(result)
    }
  })
}

/**
 * Updates a user's details by email.
 * @param {string} req.body.firstName - The user's first name.
 * @param {string} req.body.lastName - The user's last name.
 * @param {string} req.body.email - The user's email.
 * @param {Response} res - The response.
 * @returns The new user's id.
 */
function updateDetails (req: Request, res: Response): Response | void {
  const sql = 'UPDATE users SET firstName = ?, lastName = ? WHERE email = ?'
  const params = [
    req.body.firstName,
    req.body.lastName,
    req.params.email
  ]
  db.run(sql, params, (err: Error) => {
    if (err) {
      res.status(400).send('Something went wrong')
    } else {
      res.status(200).send('Done')
    }
  })
}

export default {
  createUser,
  findByEmail,
  updateDetails
}
