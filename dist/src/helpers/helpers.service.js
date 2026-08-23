"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpersService = void 0;
const common_1 = require("@nestjs/common");
let HelpersService = class HelpersService {
    async formatResponse(logger, dataPromise, response, endpoint) {
        logger.log(`executing ${endpoint}`);
        try {
            const data = await dataPromise;
            response.status(200).send({
                data,
            });
            logger.log(`returning successful result for ${endpoint}`);
        }
        catch (error) {
            logger.error(error);
            response.status(400).send(JSON.stringify({
                message: error === null || error === void 0 ? void 0 : error.message,
            }));
            return;
        }
    }
    isNumber(value) {
        return !Number.isNaN(+value);
    }
    capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }
};
HelpersService = __decorate([
    (0, common_1.Injectable)()
], HelpersService);
exports.HelpersService = HelpersService;
//# sourceMappingURL=helpers.service.js.map