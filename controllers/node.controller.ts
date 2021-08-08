/**
 * @file A controller for the node data.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

import crypto from 'crypto'
import db from '../services/db'
import { Request, Response } from 'express'
import { Node, SQLiteError } from '../types'

// --------------
// Exports
// --------------

function initGenesis (req: Request, res: Response): Response | void {
  const sql = 'INSERT INTO nodes (id, hash, previousHash, message, fromUser, toUser, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
  const params = [1, '0x00', '0x00', '0x00', '0x00', '0x00', '0x00']
  db.run(sql, params, (err: SQLiteError) => {
    if (err) {
      switch (err.errno) {
        case 19:
          res.status(400).send('Genesis node already exist')
          break
        default:
          res.status(400).send(err)
          break
      }
    } else {
      res.status(201).send('Done')
    }
  })
}

function createNode (req: Request, res: Response): Response | void {
  db.all('SELECT * FROM nodes ORDER BY ID DESC LIMIT 1', (err: SQLiteError, result: Array<Node>) => {
    if (err || result.length === 0) {
      res.status(400).send(err ?? 'Could not find previous node, if this is the first node, makes sure to init the genesis node.')
    } else {
      const datetime = new Date()
      const salt = crypto.randomBytes(16).toString('base64')
      const hash = crypto.createHmac('sha512', salt).update(result[0].hash + req.body.data + datetime).digest('base64')
      const sql = 'INSERT INTO nodes (hash, previousHash, message, fromUser, toUser, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
      const params = [
        hash,
        result[0].hash,
        req.body.message,
        req.body.from,
        req.body.to,
        datetime
      ]
      db.run(sql, params, (errCreate: SQLiteError) => {
        if (errCreate) {
          res.status(400).send(errCreate)
        } else {
          res.status(201).send('Done')
        }
      })
    }
  })
}

export default {
  initGenesis,
  createNode
}
