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
var AnalyticsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const policy_guard_1 = require("../casl/policy/policy.guard");
const helpers_service_1 = require("../helpers/helpers.service");
const permissions_1 = require("../permissions/permissions");
const analytics_service_1 = require("./analytics.service");
let AnalyticsController = AnalyticsController_1 = class AnalyticsController {
    constructor(analyticsService, helpersService) {
        this.analyticsService = analyticsService;
        this.helpersService = helpersService;
        this.logger = new common_1.Logger(AnalyticsController_1.name);
    }
    findAllProducts(res, req) {
        return this.helpersService.formatResponse(this.logger, this.analyticsService.getFeaturedProducts(), res, `get feature products sales`);
    }
    findLatestTransactions(res, req) {
        return this.helpersService.formatResponse(this.logger, this.analyticsService.getLatestTransactiosn(), res, `get transactions products sales`);
    }
    findActiveProducts(res, req) {
        return this.helpersService.formatResponse(this.logger, this.analyticsService.getActiveProducts(), res, `get active products sales`);
    }
    findRevenueSummary(res, req) {
        return this.helpersService.formatResponse(this.logger, this.analyticsService.getRevenueSummary(), res, `get revenue summary products sales`);
    }
    getLast12(res, req) {
        return this.helpersService.formatResponse(this.logger, this.analyticsService.getLast12Months(), res, `get last 12  products sales`);
    }
};
__decorate([
    (0, common_1.Get)('featured'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "findLatestTransactions", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "findActiveProducts", null);
__decorate([
    (0, common_1.Get)('revenueSummary'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "findRevenueSummary", null);
__decorate([
    (0, common_1.Get)('last12'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getLast12", null);
AnalyticsController = AnalyticsController_1 = __decorate([
    (0, common_1.Controller)('admin/analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
        helpers_service_1.HelpersService])
], AnalyticsController);
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map