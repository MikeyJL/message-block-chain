"use strict";
/**
 * @file Auth API routes for users.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 * @version 1.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_user_middleware_1 = __importDefault(require("../middleware/verify-user.middleware"));
const validate_user_middleware_1 = __importDefault(require("../middleware/validate-user.middleware"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
function routesConfig(app) {
    app.post('/v1/auth', [
        verify_user_middleware_1.default.checkAuthFields,
        verify_user_middleware_1.default.isPasswordCorrect,
        auth_controller_1.default.login
    ]);
    app.post('/v1/auth/refresh', [
        validate_user_middleware_1.default.validateJWT,
        validate_user_middleware_1.default.verifyRefreshData,
        validate_user_middleware_1.default.validateRefreshToken,
        auth_controller_1.default.login
    ]);
}
exports.default = {
    routesConfig
};
//# sourceMappingURL=auth.route.js.map