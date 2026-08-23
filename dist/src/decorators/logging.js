"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('LoggingDecorator');
function Logging(logger, msg) {
    return function (target, propertyKey, descriptor) {
        if (descriptor) {
            return _generateDescriptor(descriptor, propertyKey, msg);
        }
    };
}
exports.Logging = Logging;
function _generateDescriptor(descriptor, functionName, msg) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        try {
            logger.log(`executing ${msg}`);
            return await originalMethod.apply(this, args);
        }
        finally {
            logger.log(`returning ${msg}`);
        }
    };
    return descriptor;
}
//# sourceMappingURL=logging.js.map