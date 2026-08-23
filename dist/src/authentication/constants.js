"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const jwt_config_1 = require("./jwt.config");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.jwtConstants = {
    secret: (0, jwt_config_1.getJwtSecret)(),
};
//# sourceMappingURL=constants.js.map