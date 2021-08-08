/**
 * @file Authenticates and provides the tokens for API user.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const db = require('../services/db')
const crypto = require('crypto')

/**
 * Checks if the request body is missing any fields.
 * @param {object} req - The request.
 * @param {object} res - The response.
 * @param {function} next - Next function.
 */
exports.checkAuthFields = (req, res, next) => {
  const errors = []

  if (req.body) {
    if (!req.body.email) {
      errors.push('Missing email')
    }
    if (!req.body.password) {
      errors.push('Missing password')
    }

    if (!errors) {
      return res.status(400).send({ errors })
    } else {
      return next()
    }
  } else {
    req.status(400).send({ error: 'Missing body' })
  }
}

/**
 * Checks if the password given is correct and matches the hashed version stored on the database.
 * @param {object} req - The request.
 * @param {object} res - The response.
 * @param {function} next - Next function.
 */
exports.isPasswordCorrect = (req, res, next) => {
  const sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
  db.all(sql, (err, result) => {
    if (err) {
      res.status(404).send('Something went wrong')
    } else {
      const passwordData = result[0].password.split('$')
      const salt = passwordData[0]
      const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
      if (hash === passwordData[1]) {
        req.body = {
          id: result[0].id,
          email: result[0].email,
          firstName: result[0].firstName,
          lastName: result[0].lastName
        }
        return next()
      } else {
        res.status(400).send('Invalid password')
      }
    }
  })
}
