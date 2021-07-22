/**
 * @file Communicates with MongoDB and creates the node schema.
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
const nodeSchema = new Schema({
  previousNodeId: String,
  data: String
})
const Node = mongoose.model('Nodes', nodeSchema)

// --------------
// Exports
// --------------

/**
 * Creates a new node in database.
 * @param {object} nodeData - The data for the node.
 * @returns The new node information.
 */
exports.createNode = (nodeData) => {
  const node = new Node(nodeData)
  return node.save()
}

/**
 * Gets all the nodes.
 * @returns A promise of the list of nodes.
 */
exports.getAllNodes = () => {
  return new Promise((resolve, reject) => {
    Node.find().exec((error, nodes) => {
      error ? reject(error) : resolve(nodes)
    })
  })
}
