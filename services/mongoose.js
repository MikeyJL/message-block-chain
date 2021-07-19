/**
 * @file Connects to MongoDB.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

require('dotenv').config()
const mongoose = require('mongoose')
let attempted = 0

const connectWithRetry = () => {
  console.log('\nConnecting...')
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('\nConnected')
  }).catch((error) => {
    console.log(error)
    console.log('\nFailed. Retrying...')
    attempted++
    if (attempted < 5) {
      setTimeout(connectWithRetry(), 5000)
    } else {
      console.log('Failed. Please check that your MongoDB URL is correct.')
    }
  })
}

connectWithRetry()
exports.mongoose = mongoose
