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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductDto = void 0;
const classes_1 = require("@automapper/classes");
const user_dto_1 = require("../../users/user.dto");
const product_entity_1 = require("../entities/product.entity");
const class_validator_1 = require("class-validator");
const create_product_dto_1 = require("./create-product.dto");
class updateProductDto {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], updateProductDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], updateProductDto.prototype, "numAvail", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], updateProductDto.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], updateProductDto.prototype, "price", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], updateProductDto.prototype, "rewardRatio", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsEnum)(product_entity_1.Presentation),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updateProductDto.prototype, "presentation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], updateProductDto.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsEnum)(product_entity_1.ProductStatus),
    __metadata("design:type", String)
], updateProductDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", user_dto_1.UserDTO)
], updateProductDto.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", create_product_dto_1.CreateProductDto)
], updateProductDto.prototype, "parent", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], updateProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], updateProductDto.prototype, "longDescription", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], updateProductDto.prototype, "sections", void 0);
exports.updateProductDto = updateProductDto;
//# sourceMappingURL=update-product.dto%20copy.js.map