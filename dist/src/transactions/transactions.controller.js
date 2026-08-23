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
var TransactionsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const helpers_service_1 = require("../helpers/helpers.service");
const transactions_dto_1 = require("./transactions.dto");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
const policy_guard_1 = require("../casl/policy/policy.guard");
let TransactionsController = TransactionsController_1 = class TransactionsController {
    constructor(transactionService, appService) {
        this.transactionService = transactionService;
        this.appService = appService;
        this.logger = new common_1.Logger(TransactionsController_1.name);
    }
    async createTransaction(transaction, req, res) {
        return this.appService.formatResponse(this.logger, this.transactionService.createTransaction(transaction), res, `create transaction for user ${req.user.id} and of id ${req.params.id}`);
    }
    async editTransaction(transaction, req, res) {
        return this.appService.formatResponse(this.logger, this.transactionService.modifyTransaction(req.params.id, transaction), res, `update transaction for user ${req.user.id} and of id ${req.params.id}`);
    }
    async getTransaction(req, res) {
        return this.appService.formatResponse(this.logger, this.transactionService.getTransaction(req.params.id), res, `getting transaction for user ${req.user.id} of id ${req.params.id}`);
    }
    findAll(res, req, from, to, type, customer, id, state, page, rowsPerPage) {
        return this.appService.formatResponse(this.logger, this.transactionService.findAllForAdmin({ from, to, type, customer, id, state }, { page, rowsPerPage }), res, `getting all transactions for user ${req.user.id} `);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactions_dto_1.TransactionsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.transactions)),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactions_dto_1.TransactionsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "editTransaction", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.transactions)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getTransaction", null);
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
], TransactionsController.prototype, "findAll", null);
TransactionsController = TransactionsController_1 = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService,
        helpers_service_1.HelpersService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map