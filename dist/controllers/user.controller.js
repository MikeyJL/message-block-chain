"use strict";
/**
 * @file A controller for the user data.
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
/**
 * Creates a new user.
 * @param {object} res - The response.
 * @param {object} req - The data required to create a new user.
 * @param {string} req.firstName - The user's first name.
 * @param {string} req.lastName - The user's last name.
 * @param {string} req.email - The user's email.
 * @param {string} req.password - The user's password.
 * @returns The new user's id.
 */
function createUser(req, res) {
    const salt = crypto_1.default.randomBytes(16).toString('base64');
    const hash = crypto_1.default.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = `${salt}$${hash}`;
    const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    const params = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
    db_1.default.run(sql, params, (err) => {
        if (err) {
            switch (err.errno) {
                case 19:
                    res.status(400).send('Email already in use');
                    break;
                default:
                    res.status(400).send('Something went wrong');
                    break;
            }
        }
        else {
            res.status(201).send('Done');
        }
    });
}
function findByEmail(req, res) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const params = [req.params.email];
    db_1.default.all(sql, params, (err, result) => {
        if (err) {
            res.status(400).send('Something went wrong');
        }
        else {
            res.status(200).send(result);
        }
    });
}
function updateDetails(req, res) {
    const sql = 'UPDATE users SET firstName = ?, lastName = ? WHERE email = ?';
    const params = [
        req.body.firstName,
        req.body.lastName,
        req.params.email
    ];
    db_1.default.run(sql, params, (err) => {
        if (err) {
            res.status(400).send('Something went wrong');
        }
        else {
            res.status(200).send('Done');
        }
    });
}
exports.default = {
    createUser,
    findByEmail,
    updateDetails
};
//# sourceMappingURL=user.controller.js.map