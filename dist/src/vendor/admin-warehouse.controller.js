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
var AdminWarehouseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWarehouseController = void 0;
const common_1 = require("@nestjs/common");
const warehouse_dto_1 = require("./warehouse.dto");
const helpers_service_1 = require("../helpers/helpers.service");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
const warehouse_service_1 = require("./warehouse.service");
let AdminWarehouseController = AdminWarehouseController_1 = class AdminWarehouseController {
    constructor(warehouseService, appService) {
        this.warehouseService = warehouseService;
        this.appService = appService;
        this.logger = new common_1.Logger(AdminWarehouseController_1.name);
    }
    async search(search, res, req) {
        return this.appService.formatResponse(this.logger, this.warehouseService.search(search), res, `get warehouses for user ${req.user.id} of search ${search}`);
    }
    async getVendors(req, res, filter, rowsPerPage, page) {
        return this.appService.formatResponse(this.logger, this.warehouseService.getAll(filter, { rowsPerPage, page }), res, `getting warehouses for ${req.user.id}`);
    }
    async getUser(req, res) {
        return this.appService.formatResponse(this.logger, this.warehouseService.findOne(req.params.id), res, `getting warehouse ${req.params.id} by ${req.user.id}`);
    }
    async deleteUser(req, res) {
        return this.appService.formatResponse(this.logger, this.warehouseService.remove(req.params.id), res, `deleting warehouse ${req.params.id} by ${req.user.id} `);
    }
    async updateUsers(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.warehouseService.changeStates(payload), res, `change state of  warehouses  by ${req.user.id} `);
    }
    async create(req, res, warehouse) {
        return this.appService.formatResponse(this.logger, this.warehouseService.create(warehouse), res, `creating warehouse for ${req.user.id}`);
    }
    async update(req, res, warehouse) {
        return this.appService.formatResponse(this.logger, this.warehouseService.update(req.params.id, warehouse), res, `update warehouse ${req.params.id} by ${req.user.id}`);
    }
};
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('status/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "updateUsers", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, warehouse_dto_1.WarehouseDTO]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.warehouse)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, warehouse_dto_1.WarehouseDTO]),
    __metadata("design:returntype", Promise)
], AdminWarehouseController.prototype, "update", null);
AdminWarehouseController = AdminWarehouseController_1 = __decorate([
    (0, common_1.Controller)('admin/warehouses'),
    __metadata("design:paramtypes", [warehouse_service_1.WarehouseService,
        helpers_service_1.HelpersService])
], AdminWarehouseController);
exports.AdminWarehouseController = AdminWarehouseController;
//# sourceMappingURL=admin-warehouse.controller.js.map