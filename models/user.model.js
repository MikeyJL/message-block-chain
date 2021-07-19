/**
 * @file Communicates with MongoDB and creates the user schema.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const mongoose = require('../services/mongoose').mongoose

// --------------
// Set-up
// --------------

const Schema = mongoose.Schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
})
const User = mongoose.model('Users', userSchema)

// --------------
// Exports
// --------------

/**
 * Creates a new user.
 * @param {object} userData - The data required to create a new user.
 * @param {string} userData.firstName - The user's first name.
 * @param {string} userData.lastName - The user's last name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns The new user's id.
 */
exports.createUser = (userData) => {
  const user = new User(userData)
  return user.save()
}

/**
 * Find a user based on the email provided.
 * @param {string} email - The email to search against the database.
 * @returns The user object as a Query instance.
 */
exports.findByEmail = (email) => {
  return User.find({ email })
}
