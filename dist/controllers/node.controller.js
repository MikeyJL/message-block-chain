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
// --------------
// Exports
// --------------
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
exports.default = {
    initGenesis,
    createNode
};
//# sourceMappingURL=node.controller.js.map