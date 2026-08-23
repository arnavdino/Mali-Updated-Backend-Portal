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
var AdminPromotionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPromotionController = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const create_promotion_dto_1 = require("./dto/create-promotion.dto");
const helpers_service_1 = require("../helpers/helpers.service");
const files_service_1 = require("../common/file/files.service");
const platform_express_1 = require("@nestjs/platform-express");
const policy_guard_1 = require("../casl/policy/policy.guard");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
let AdminPromotionController = AdminPromotionController_1 = class AdminPromotionController {
    constructor(promotionService, helpersService, fileService) {
        this.promotionService = promotionService;
        this.helpersService = helpersService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(AdminPromotionController_1.name);
    }
    create(createProductDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.create(req.user, createProductDto), res, `create  promotion for user ${req.user.id} `);
    }
    async uploadItem(req, res, file) {
        return await this.fileService.fileupload(res, (name) => this.promotionService.addImageToPromotion(req.params.id, req.user.id, name), file);
    }
    findProductForPromotion(res, req, filter) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.getProductForPromotions(filter), res, `get all products for promotion for admin ${req.user.id} `);
    }
    findAll(res, req, filter, rowsPerPage, page) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.findAll(filter, { rowsPerPage, page }), res, `get all promotion for admin ${req.user.id} `);
    }
    findOne(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.findOne(id), res, `get promotion for user ${req.user.id} of id ${id}`);
    }
    update(id, updateProductDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.update(id, updateProductDto), res, `update promotion for user ${req.user.id} of id ${id}`);
    }
    remove(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.remove(id), res, `deleting promotion for user ${req.user.id} of id ${id}`);
    }
};
__decorate([
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.promotion)),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promotion_dto_1.CreatePromotionDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.promotion)),
    (0, common_1.Post)('image/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminPromotionController.prototype, "uploadItem", null);
__decorate([
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.promotion)),
    (0, common_1.Get)('product/search'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findProductForPromotion", null);
__decorate([
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.promotion)),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_promotion_dto_1.CreatePromotionDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminPromotionController.prototype, "remove", null);
AdminPromotionController = AdminPromotionController_1 = __decorate([
    (0, common_1.Controller)('admin/promotions'),
    __metadata("design:paramtypes", [promotion_service_1.PromotionService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], AdminPromotionController);
exports.AdminPromotionController = AdminPromotionController;
//# sourceMappingURL=admin-promotion.controller.js.map