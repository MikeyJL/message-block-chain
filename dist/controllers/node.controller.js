"use strict";
/**
 * @file A controller for the node data.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../services/db"));
/**
 * Generates the genesis node of a new blockchain.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns A response.
 */
function initGenesis(req, res) {
    const sql = 'INSERT INTO nodes (id, hash, previousHash, message, fromUser, toUser, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [1, '0x00', '0x00', '0x00', '0x00', '0x00', '0x00'];
    db_1.default.run(sql, params, (err) => {
        if (err) {
            switch (err.errno) {
                case 19:
                    res.status(400).send('Genesis node already exist');
                    break;
                default:
                    res.status(400).send(err);
                    break;
            }
        }
        else {
            res.status(201).send('Done');
        }
    });
}
/**
 * Creates a new node in the blockchain.
 * @param {string} req.body.message - The message.
 * @param {string} req.body.from - Who the message is from.
 * @param {string} req.body.to - Who the message is intended for.
 * @param {Response} res - The response object
 * @returns A response.
 */
function createNode(req, res) {
    db_1.default.all('SELECT * FROM nodes ORDER BY ID DESC LIMIT 1', (err, result) => {
        if (err || result.length === 0) {
            res.status(400).send(err !== null && err !== void 0 ? err : 'Could not find previous node, if this is the first node, makes sure to init the genesis node.');
        }
        else {
            const datetime = new Date();
            const salt = crypto_1.default.randomBytes(16).toString('base64');
            const hash = crypto_1.default.createHmac('sha512', salt).update(result[0].hash + req.body.data + datetime).digest('base64');
            const sql = 'INSERT INTO nodes (hash, previousHash, message, fromUser, toUser, createdAt) VALUES (?, ?, ?, ?, ?, ?)';
            const params = [
                hash,
                result[0].hash,
                req.body.message,
                req.body.from,
                req.body.to,
                datetime
            ];
            db_1.default.run(sql, params, (errCreate) => {
                if (errCreate) {
                    res.status(400).send(errCreate);
                }
                else {
                    res.status(201).send('Done');
                }
            });
        }
    });
}
/**
 * Gets all the nodes in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object
 * @returns A response.
 */
function getAllNodes(req, res) {
    const sql = 'SELECT * FROM nodes';
    db_1.default.all(sql, (err, result) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}
exports.default = {
    initGenesis,
    createNode,
    getAllNodes
};
//# sourceMappingURL=node.controller.js.map