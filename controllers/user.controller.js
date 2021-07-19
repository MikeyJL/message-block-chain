/**
 * @file A controller for the user data.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const UserModel = require('../models/user.model')
const crypto = require('crypto')

exports.createUser = (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64')
  const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
  req.body.password = `${salt}$${hash}`
  UserModel.createUser(req.body).then((result) => {
    res.status(201).send({
      id: result._id
    })
  })
}
