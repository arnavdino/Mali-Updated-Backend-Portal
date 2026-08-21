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
var ProductAdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdminController = void 0;
const common_1 = require("@nestjs/common");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const permissions_1 = require("../permissions/permissions");
const product_service_1 = require("./product.service");
const helpers_service_1 = require("../helpers/helpers.service");
const files_service_1 = require("../common/file/files.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const policy_guard_1 = require("../casl/policy/policy.guard");
let ProductAdminController = ProductAdminController_1 = class ProductAdminController {
    constructor(productService, helpersService, fileService) {
        this.productService = productService;
        this.helpersService = helpersService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(ProductAdminController_1.name);
    }
    findAllProducts(res, req, filter, rowsPerPage, page) {
        return this.helpersService.formatResponse(this.logger, this.productService.findAll(filter, {
            rowsPerPage: rowsPerPage || 20,
            page: page || 0,
        }), res, `get all product for admin ${req.user.id} `);
    }
    searchCategories(search, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.searchCategories(search), res, `get categories for user ${req.user.id} of search ${search}`);
    }
    findCategories(res, req, filter, parentId, include) {
        return this.helpersService.formatResponse(this.logger, this.productService.getCategories(filter, parentId, include), res, `get all categories for admin ${req.user.id} `);
    }
    create(createProductDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.create(req.user, createProductDto), res, `create  product for user ${req.user.id} `);
    }
    async uploadItem(req, res, file) {
        return await this.fileService.fileupload(res, (name) => this.productService.addImageToProduct(req.params.id, req.user.id, name), file);
    }
    update(id, updateProductDto, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.update(id, updateProductDto), res, `update product for user ${req.user.id} of id ${id}`);
    }
    remove(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.remove(id), res, `deleting product for user ${req.user.id} of id ${id}`);
    }
    batchRemove(ids, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.removeBatch(ids), res, `deleting batch products for user ${req.user.id} of ids ${ids}`);
    }
    changeState(ids, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.changeStateBatch(ids, req.params.state), res, `change state batch products for user ${req.user.id} of ids ${ids}`);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __param(4, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('categories/search'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "searchCategories", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.read, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('filter')),
    __param(3, (0, common_1.Query)('parentId')),
    __param(4, (0, common_1.Query)('include')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "findCategories", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('image/:id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.product)),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "uploadItem", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('/delete/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.delete, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "batchRemove", null);
__decorate([
    (0, common_1.Put)(':state/batch'),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.update, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "changeState", null);
ProductAdminController = ProductAdminController_1 = __decorate([
    (0, common_1.Controller)('admin/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], ProductAdminController);
exports.ProductAdminController = ProductAdminController;
//# sourceMappingURL=product-admin.controller.js.map