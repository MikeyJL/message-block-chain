"use strict";
/**
 * @file User API routes for nodes.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_user_middleware_1 = __importDefault(require("../middleware/validate-user.middleware"));
const node_controller_1 = __importDefault(require("../controllers/node.controller"));
function routesConfig(app) {
    app.post('/v1/nodes/init', [
        validate_user_middleware_1.default.validateJWT,
        node_controller_1.default.initGenesis
    ]);
    app.post('/v1/nodes', [
        validate_user_middleware_1.default.validateJWT,
        node_controller_1.default.createNode
    ]);
}
exports.default = {
    routesConfig
};
//# sourceMappingURL=nodes.route.js.map