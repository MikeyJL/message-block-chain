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

// --------------
// Exports
// --------------

/**
 * Creates a new user.
 * @param {object} res - The response.
 * @param {object} req - The data required to create a new user.
 * @param {string} req.firstName - The user's first name.
 * @param {string} req.lastName - The user's last name.
 * @param {string} req.email - The user's email.
 * @param {string} req.password - The user's password.
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
