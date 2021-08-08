"use strict";
/**
 * @file User API routes for users.
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
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
/**
 * Routes for user endpoints.
 * @param {Application} app - The app instance.
 */
function routesConfig(app) {
    app.post('/v1/users', [user_controller_1.default.createUser]);
    app.get('/v1/users/:email', [
        validate_user_middleware_1.default.validateJWT,
        user_controller_1.default.findByEmail
    ]);
    app.put('/v1/users/:email', [
        validate_user_middleware_1.default.validateJWT,
        user_controller_1.default.updateDetails
    ]);
}
exports.default = {
    routesConfig
};
//# sourceMappingURL=users.route.js.map