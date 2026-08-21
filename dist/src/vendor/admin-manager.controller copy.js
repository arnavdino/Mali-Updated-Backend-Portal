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
var AdminManagerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminManagerController = void 0;
const common_1 = require("@nestjs/common");
const helpers_service_1 = require("../helpers/helpers.service");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
const manager_service_1 = require("./manager.service");
const warehouse_manger_dto_1 = require("./warehouse-manger.dto");
let AdminManagerController = AdminManagerController_1 = class AdminManagerController {
    constructor(managerService, appService) {
        this.managerService = managerService;
        this.appService = appService;
        this.logger = new common_1.Logger(AdminManagerController_1.name);
    }
    async getAll(req, res, filter, rowsPerPage, page) {
        return this.appService.formatResponse(this.logger, this.managerService.getAll(filter, { rowsPerPage, page }), res, `getting managers for ${req.user.id}`);
    }
    async getUser(req, res) {
        return this.appService.formatResponse(this.logger, this.managerService.findOne(req.params.id), res, `getting manager ${req.params.id} by ${req.user.id}`);
    }
    async deleteUser(req, res) {
        return this.appService.formatResponse(this.logger, this.managerService.remove(req.params.id), res, `deleting manager ${req.params.id} by ${req.user.id} `);
    }
    async updateStatuses(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.managerService.changeStates(payload), res, `change state of  managers  by ${req.user.id} `);
    }
    async create(req, res, manager) {
        return this.appService.formatResponse(this.logger, this.managerService.create(manager), res, `creating manager for ${req.user.id}`);
    }
    async update(req, res, manager) {
        return this.appService.formatResponse(this.logger, this.managerService.update(req.params.id, manager), res, `update manager ${req.params.id} by ${req.user.id}`);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('status/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "updateStatuses", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, warehouse_manger_dto_1.WarehouseManagerDTO]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.manager)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, warehouse_manger_dto_1.WarehouseManagerDTO]),
    __metadata("design:returntype", Promise)
], AdminManagerController.prototype, "update", null);
AdminManagerController = AdminManagerController_1 = __decorate([
    (0, common_1.Controller)('admin/managers'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService,
        helpers_service_1.HelpersService])
], AdminManagerController);
exports.AdminManagerController = AdminManagerController;
//# sourceMappingURL=admin-manager.controller%20copy.js.map