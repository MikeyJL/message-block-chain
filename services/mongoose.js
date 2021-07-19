/**
 * @file Connects to MongoDB.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

require('dotenv').config()
const mongoose = require('mongoose')

const connectWithRetry = () => {
  console.log('\nConnecting...')
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('\nConnected')
  }).catch((error) => {
    console.log(error)
    console.log('\nFailed. Retrying...')
    setTimeout(connectWithRetry(), 5000)
  })
}

connectWithRetry()
exports.mongoose = mongoose
