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
var PurchaseAdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseAdminController = void 0;
const common_1 = require("@nestjs/common");
const purchase_service_1 = require("./purchase.service");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const helpers_service_1 = require("../helpers/helpers.service");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
let PurchaseAdminController = PurchaseAdminController_1 = class PurchaseAdminController {
    constructor(purchaseService, helpersService) {
        this.purchaseService = purchaseService;
        this.helpersService = helpersService;
        this.logger = new common_1.Logger(PurchaseAdminController_1.name);
    }
    findAll(res, req, from, to, type, customer, id, state, page, rowsPerPage) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findAllForAdmin({ from, to, type, customer, id, state }, { page, rowsPerPage }), res, `getting all purchases for user ${req.user.id} `);
    }
    ginfCategories(res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findCategories(), res, `get purchase categories for user ${req.user.id} `);
    }
    getStatuses(res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findStatuses(), res, `get purchase statuses for user ${req.user.id} `);
    }
    findOne(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findOne(id), res, `get purchase for user ${req.user.id} of id ${id}`);
    }
    initiateRefund(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.initiateRefuned(id), res, `initiate refund for  purchase for user ${req.user.id} of id ${id}`);
    }
    declineRefund(id, res, req, body) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.declineRefund(id, body.notes), res, `decline refund for  purchase for user ${req.user.id} of id ${id}`);
    }
    confirmRefund(id, res, req, body) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.confrimRefund(id, body.notes), res, `confirm refund for  purchase for user ${req.user.id} of id ${id}`);
    }
    update(id, updatePurchaseDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.update(id, updatePurchaseDto), res, `update purchase for user ${req.user.id} of id ${id}`);
    }
    remove(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.remove(id), res, `delete purchase for user ${req.user.id} of id ${id}`);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, common_1.Query)('type')),
    __param(5, (0, common_1.Query)('customer')),
    __param(6, (0, common_1.Query)('id')),
    __param(7, (0, common_1.Query)('state')),
    __param(8, (0, common_1.Query)('page')),
    __param(9, (0, common_1.Query)('rowsPerPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "ginfCategories", null);
__decorate([
    (0, common_1.Get)('statuses'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "getStatuses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/initiate'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.refund_initiate, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "initiateRefund", null);
__decorate([
    (0, common_1.Put)(':id/decline'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.refund_confirming, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "declineRefund", null);
__decorate([
    (0, common_1.Put)(':id/confirm'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.refund_confirming, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "confirmRefund", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_purchase_dto_1.PurchaseDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseAdminController.prototype, "remove", null);
PurchaseAdminController = PurchaseAdminController_1 = __decorate([
    (0, common_1.Controller)('admin/transactions'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService,
        helpers_service_1.HelpersService])
], PurchaseAdminController);
exports.PurchaseAdminController = PurchaseAdminController;
//# sourceMappingURL=purchase-admin.controller.js.map