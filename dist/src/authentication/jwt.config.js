"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwtSecret = exports.getJwtSecret = void 0;
const JWT_SECRET_KEYS = ['JWT_SECRET', 'SECRET_KEY', 'JWT_KEY'];
function getJwtSecret(configService) {
    var _a;
    for (const key of JWT_SECRET_KEYS) {
        const value = (_a = configService === null || configService === void 0 ? void 0 : configService.get(key)) !== null && _a !== void 0 ? _a : process.env[key];
        if (value) {
            return value;
        }
    }
    return undefined;
}
exports.getJwtSecret = getJwtSecret;
function requireJwtSecret(configService) {
    const secret = getJwtSecret(configService);
    if (!secret) {
        throw new Error('Missing JWT secret. Set one of JWT_SECRET, SECRET_KEY, or JWT_KEY before starting the app.');
    }
    return secret;
}
exports.requireJwtSecret = requireJwtSecret;
//# sourceMappingURL=jwt.config.js.map