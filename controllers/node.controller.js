/**
 * @file A controller for the node data.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */

const NodeModel = require('../models/node.model')

// --------------
// Exports
// --------------

/**
 * Creates a new node in the database.
 * @param {object} req - The request.
 * @param {object} res - The response.
 */
exports.createNode = (req, res) => {
  try {
    NodeModel.createNode(req.body).then((result) => {
      res.status(200).send({
        nodeHash: result
      })
    })
  } catch {
    res.status(500).send({ error: 'Something went wrong' })
  }
}
