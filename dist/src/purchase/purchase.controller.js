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
var PurchaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const purchase_service_1 = require("./purchase.service");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const helpers_service_1 = require("../helpers/helpers.service");
const role_decorator_1 = require("../authentication/role.decorator");
let PurchaseController = PurchaseController_1 = class PurchaseController {
    constructor(purchaseService, helpersService) {
        this.purchaseService = purchaseService;
        this.helpersService = helpersService;
        this.logger = new common_1.Logger(PurchaseController_1.name);
    }
    create(createPurchaseDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.create(createPurchaseDto, req.user.id), res, `create purchase for user ${req.user.id}`);
    }
    findAll(res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findAll(req.user.id), res, `getting all purchases for user ${req.user.id} `);
    }
    findOne(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.findOne(id), res, `get purchase for user ${req.user.id} of id ${id}`);
    }
    update(id, updatePurchaseDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.update(id, updatePurchaseDto), res, `update purchase for user ${req.user.id} of id ${id}`);
    }
    remove(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.purchaseService.remove(id), res, `delete purchase for user ${req.user.id} of id ${id}`);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)('User'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.PurchaseDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_purchase_dto_1.PurchaseDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "remove", null);
PurchaseController = PurchaseController_1 = __decorate([
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService,
        helpers_service_1.HelpersService])
], PurchaseController);
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map