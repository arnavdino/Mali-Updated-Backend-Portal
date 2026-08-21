"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const helpers_service_1 = require("../helpers/helpers.service");
const user_dto_1 = require("../users/user.dto");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const local_auth_gard_1 = require("./local-auth.gard");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, appService) {
        this.authService = authService;
        this.appService = appService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(req, res) {
        return this.appService.formatResponse(this.logger, this.authService.login(req.user), res, `user trying to login ${req.email}`);
    }
    async register(user, res) {
        return this.appService.formatResponse(this.logger, this.authService.register(user), res, `new user registering with their email ${user.fname}`);
    }
    async verify(payload, res) {
        return this.appService.formatResponse(this.logger, this.authService.verify(payload.email, payload.code), res, `verifying email`);
    }
    async createReset(req, res, params) {
        return this.appService.formatResponse(this.logger, this.authService.createCodeForReset(params.email), res, `creating reset request for user ${params.email}`);
    }
    async resetPassword(req, res, paylod) {
        return this.appService.formatResponse(this.logger, this.authService.resetPassword(paylod.email, paylod.code, paylod.password), res, `resetting password for user ${paylod.email}`);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_gard_1.LocalAuthGuard),
    (0, constants_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('email/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)('code'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createReset", null);
__decorate([
    (0, common_1.Post)('password/reset'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        helpers_service_1.HelpersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map