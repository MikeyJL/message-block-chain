"use strict";
/**
 * @file Manages the authentication processes.
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
const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * Authenticates the user and sends the access and refresh tokens.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @returns A response.
 */
function login(req, res) {
    try {
        const refreshId = req.body.userId + process.env.JWT_SECRET;
        const salt = crypto_1.default.randomBytes(16).toString('base64');
        const hash = crypto_1.default.createHmac('sha512', salt).update(refreshId).digest('base64');
        req.body.refreshKey = salt;
        const token = jwt.sign(req.body, process.env.JWT_SECRET);
        const refreshToken = Buffer.from(hash).toString('base64');
        res.status(201).send({
            accessToken: token,
            refreshToken
        });
    }
    catch (error) {
        res.status(500).send({ errors: error });
    }
}
/**
 * Creates and sends the refresh token.
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @returns A response.
 */
function refreshToken(req, res) {
    try {
        req.body = req.body.jwt;
        const token = jwt.sign(req.body, process.env.JWT_SECRET);
        res.status(201).send({ id: token });
    }
    catch (error) {
        res.status(500).send({ errors: error });
    }
}
exports.default = {
    login,
    refreshToken
};
//# sourceMappingURL=auth.controller.js.map