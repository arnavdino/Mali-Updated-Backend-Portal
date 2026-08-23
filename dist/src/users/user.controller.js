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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const helpers_service_1 = require("../helpers/helpers.service");
const users_service_1 = require("./users.service");
const edit_user_dto_1 = require("./edit-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("../common/file/files.service");
let UserController = UserController_1 = class UserController {
    constructor(userService, appService, fileService) {
        this.userService = userService;
        this.appService = appService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async getUser(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.getProfile(req.user.username), res, `getting profile for ${req.user.id}`);
    }
    async uploadItem(req, res, file) {
        return await this.fileService.fileupload(res, (name) => this.userService.addImage(req.user.id, name), file);
    }
    async updateInfo(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.userService.updateInfo(req.user.username, payload), res, `update user ${req.user.id} with fname ${payload.fname} and lname ${payload.lname}`);
    }
    async deleteUser(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.deleteUser(req.user.username), res, `deleting user ${req.user.id} `);
    }
    async deleteCard(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.deleteCard(req.user, req.params.cardId), res, `deleting card for user ${req.user.id}`);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadItem", null);
__decorate([
    (0, common_1.Put)('info/update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, edit_user_dto_1.EditUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)('delete/card/:cardId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteCard", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map