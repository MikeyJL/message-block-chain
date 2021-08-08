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

/**
 * Generates the genesis node of a new blockchain.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns A response.
 */
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

/**
 * Creates a new node in the blockchain.
 * @param {string} req.body.message - The message.
 * @param {string} req.body.from - Who the message is from.
 * @param {string} req.body.to - Who the message is intended for.
 * @param {Response} res - The response object
 * @returns A response.
 */
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

/**
 * Gets all the nodes in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object
 * @returns A response.
 */
function getAllNodes (req: Request, res: Response): Response | void {
  const sql = 'SELECT * FROM nodes'
  db.all(sql, (err: SQLiteError, result: Array<Node>) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(result)
    }
  })
}

export default {
  initGenesis,
  createNode,
  getAllNodes
}
