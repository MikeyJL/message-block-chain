/**
 * @file Connects to sqlite.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('db.sqlite', (err: Error) => {
  if (err) {
    console.log(`Error: ${err}`)
  } else {
    console.log('Connected')

    const usersSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT UNIQUE,
        password,
        CONSTRAINT email_unique UNIQUE (email))`

    db.run(usersSql, (err: Error) => {
      if (err) {
        console.log('USERS', err)
      }
    })

    const nodeSql = `
      CREATE TABLE IF NOT EXISTS nodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hash TEXT,
        previousHash TEXT,
        message TEXT,
        fromUser TEXT,
        toUser TEXT,
        createdAt TEXT)`

    db.run(nodeSql, (err: Error) => {
      if (err) {
        console.log('NODES', err)
      }
    })
  }
})

export default db
