"use strict";
/**
 * @file Initiates the api and prepares all the resources.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_route_1 = __importDefault(require("./routes/users.route"));
const nodes_route_1 = __importDefault(require("./routes/nodes.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
// --------------
// Set-up
// --------------
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * Inits the headers.
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    else {
        return next();
    }
});
// --------------
// Routes
// --------------
users_route_1.default.routesConfig(app);
nodes_route_1.default.routesConfig(app);
auth_route_1.default.routesConfig(app);
app.listen(process.env.PORT, () => {
    console.log(`\nListening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map