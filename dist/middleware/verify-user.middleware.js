"use strict";
/**
 * @file Authenticates and provides the tokens for API user.
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
 * Checks if the request body is missing any fields.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Response} res - The response.
 * @param {NextFunction} next - Next function.
 * @returns A response.
 */
function checkAuthFields(req, res, next) {
    const errors = [];
    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email');
        }
        if (!req.body.password) {
            errors.push('Missing password');
        }
        if (!errors) {
            return res.status(400).send({ errors });
        }
        else {
            return next();
        }
    }
    else {
        res.status(400).send({ error: 'Missing body' });
    }
}
/**
 * Checks if the password given is correct and matches the hashed version stored on the database.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Response} res - The response.
 * @param {NextFunction} next - Next function.
 * @returns A response.
 */
function isPasswordCorrect(req, res, next) {
    const sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    db_1.default.all(sql, (err, result) => {
        if (err) {
            res.status(404).send('Something went wrong');
        }
        else {
            const passwordData = result[0].password.split('$');
            const salt = passwordData[0];
            const hash = crypto_1.default.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash === passwordData[1]) {
                req.body = {
                    id: result[0].id,
                    email: result[0].email,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName
                };
                return next();
            }
            else {
                res.status(400).send('Invalid password');
            }
        }
    });
}
exports.default = {
    checkAuthFields,
    isPasswordCorrect
};
//# sourceMappingURL=verify-user.middleware.js.map