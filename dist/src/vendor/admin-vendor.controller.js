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
var AdminVendorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVendorController = void 0;
const common_1 = require("@nestjs/common");
const vendor_service_1 = require("./vendor.service");
const vendor_dto_1 = require("./vendor.dto");
const helpers_service_1 = require("../helpers/helpers.service");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
let AdminVendorController = AdminVendorController_1 = class AdminVendorController {
    constructor(vendorService, appService) {
        this.vendorService = vendorService;
        this.appService = appService;
        this.logger = new common_1.Logger(AdminVendorController_1.name);
    }
    async search(search, res, req) {
        return this.appService.formatResponse(this.logger, this.vendorService.search(search), res, `get vendors for user ${req.user.id} of search ${search}`);
    }
    async getVendors(req, res, filter, rowsPerPage, page) {
        return this.appService.formatResponse(this.logger, this.vendorService.getVendors(filter, { rowsPerPage, page }), res, `getting vendors for ${req.user.id}`);
    }
    async getUser(req, res) {
        return this.appService.formatResponse(this.logger, this.vendorService.findOne(req.params.id), res, `getting vendor ${req.params.id} by ${req.user.id}`);
    }
    async deleteUser(req, res) {
        return this.appService.formatResponse(this.logger, this.vendorService.remove(req.params.id), res, `deleting vendor ${req.params.id} by ${req.user.id} `);
    }
    async updateUsers(req, res, payload) {
        return this.appService.formatResponse(this.logger, this.vendorService.changeVendorsState(payload), res, `change state of  vendors  by ${req.user.id} `);
    }
    async create(req, res, vendor) {
        return this.appService.formatResponse(this.logger, this.vendorService.createVendor(vendor), res, `creating vendor for ${req.user.id}`);
    }
    async update(req, res, vendor) {
        return this.appService.formatResponse(this.logger, this.vendorService.update(req.params.id, vendor), res, `update vendor ${req.params.id} by ${req.user.id}`);
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
], AdminVendorController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('status/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "updateUsers", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, vendor_dto_1.VendorDTO]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.vendor)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, vendor_dto_1.VendorDTO]),
    __metadata("design:returntype", Promise)
], AdminVendorController.prototype, "update", null);
AdminVendorController = AdminVendorController_1 = __decorate([
    (0, common_1.Controller)('admin/vendors'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        helpers_service_1.HelpersService])
], AdminVendorController);
exports.AdminVendorController = AdminVendorController;
//# sourceMappingURL=admin-vendor.controller.js.map