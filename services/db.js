/**
 * @file Connects to sqlite.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('services/db.sqlite', (err) => {
  if (err) {
    console.log(`Error: ${err}`)
  } else {
    console.log('Connected')

    const sql = `
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      password,
      CONSTRAINT email_unique UNIQUE (email))`

    db.run(sql, (err) => {
      if (err) {
        console.log('Table already exists')
      }
    })
  }
})

module.exports = db
