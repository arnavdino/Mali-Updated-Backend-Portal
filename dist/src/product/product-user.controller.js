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
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const helpers_service_1 = require("../helpers/helpers.service");
const files_service_1 = require("../common/file/files.service");
let ProductController = ProductController_1 = class ProductController {
    constructor(productService, helpersService, fileService) {
        this.productService = productService;
        this.helpersService = helpersService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(ProductController_1.name);
    }
    findUserProducts(res, req, filter) {
        return this.helpersService.formatResponse(this.logger, this.productService.findAllForUser(filter), res, `get all product for user ${req.user.id} `);
    }
    findMain(res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.findMain(), res, `get main products for user ${req.user.id} `);
    }
    search(search, category, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.search(search, category), res, `get product of category ${category} for user ${req.user.id} of search ${search}`);
    }
    findOne(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.productService.findOne(id), res, `get product for user ${req.user.id} of id ${id}`);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findUserProducts", null);
__decorate([
    (0, common_1.Get)('main'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findMain", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
ProductController = ProductController_1 = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product-user.controller.js.map