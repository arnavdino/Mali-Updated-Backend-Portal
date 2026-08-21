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
var AdminUserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const helpers_service_1 = require("../helpers/helpers.service");
const files_service_1 = require("../common/file/files.service");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
const user_dto_1 = require("./user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("../authentication/constants");
let AdminUserController = AdminUserController_1 = class AdminUserController {
    constructor(userService, appService, fileService) {
        this.userService = userService;
        this.appService = appService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(AdminUserController_1.name);
    }
    async search(search, res, req) {
        return this.appService.formatResponse(this.logger, this.userService.search(search), res, `get users for user ${req.user.id} of search ${search}`);
    }
    async getUsers(req, res, filter, isCustomer, rowsPerPage, page) {
        return this.appService.formatResponse(this.logger, this.userService.getUsers(filter, isCustomer, { rowsPerPage, page }), res, `getting users for ${req.user.id}`);
    }
    async getUser(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.getUser(req.params.id), res, `getting user ${req.params.id} by ${req.user.id}`);
    }
    async getUserVerification(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.getUserForVerification(req.params.id), res, `getting user ${req.params.id} for verification`);
    }
    async verifyUser(req, res, user) {
        return this.appService.formatResponse(this.logger, this.userService.verifyAdminUser(req.params.id, user), res, `verifying user ${req.params.id}`);
    }
    async uploadItem(req, res, file) {
        return await this.fileService.fileupload(res, (name) => this.userService.addImage(req.params.id, name), file);
    }
    async deleteUser(req, res) {
        return this.appService.formatResponse(this.logger, this.userService.deleteUser(req.params.id), res, `deleting user ${req.params.id} by ${req.user.id} `);
    }
    async deleteUsers(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.userService.deleteUsers(payload), res, `deleting users  by ${req.user.id} `);
    }
    async updateUsers(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.userService.changeUsersState(payload), res, `change state of  users  by ${req.user.id} `);
    }
    async create(req, res, user) {
        return this.appService.formatResponse(this.logger, this.userService.createUser(user, req.user.id), res, `getting users for ${req.user.id}`);
    }
    async update(req, res, user) {
        return this.appService.formatResponse(this.logger, this.userService.update(user, req.params.id), res, `update user ${req.params.id} by ${req.user.id}`);
    }
};
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('isCustomer')),
    __param(4, (0, common_1.Query)('rowsPerPage')),
    __param(5, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(':id/verify'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "getUserVerification", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Post)('image/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "uploadItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('delete/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteUsers", null);
__decorate([
    (0, common_1.Put)('status/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "updateUsers", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.user)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "update", null);
AdminUserController = AdminUserController_1 = __decorate([
    (0, common_1.Controller)('admin/user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=admin-user.controller.js.map