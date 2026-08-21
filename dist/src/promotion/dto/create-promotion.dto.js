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
exports.CreatePromotionDto = void 0;
const classes_1 = require("@automapper/classes");
const create_product_dto_1 = require("../../product/dto/create-product.dto");
const product_entity_1 = require("../../product/entities/product.entity");
const user_dto_1 = require("../../users/user.dto");
class CreatePromotionDto {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "action", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], CreatePromotionDto.prototype, "isFirstPage", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreatePromotionDto.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", user_dto_1.UserDTO)
], CreatePromotionDto.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", create_product_dto_1.CreateProductDto)
], CreatePromotionDto.prototype, "product", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "imageUrl", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], CreatePromotionDto.prototype, "discount", void 0);
exports.CreatePromotionDto = CreatePromotionDto;
//# sourceMappingURL=create-promotion.dto.js.map