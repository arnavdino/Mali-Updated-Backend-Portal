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
exports.TransactionsDto = void 0;
const classes_1 = require("@automapper/classes");
const class_validator_1 = require("class-validator");
const vendor_dto_1 = require("../vendor/vendor.dto");
const create_product_dto_1 = require("../product/dto/create-product.dto");
const warehouse_dto_1 = require("../vendor/warehouse.dto");
const transactions_entity_1 = require("./transactions.entity");
const user_dto_1 = require("../users/user.dto");
class TransactionsDto {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TransactionsDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", user_dto_1.UserDTO)
], TransactionsDto.prototype, "customer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", vendor_dto_1.VendorDTO)
], TransactionsDto.prototype, "vendor", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_product_dto_1.CreateProductDto)
], TransactionsDto.prototype, "product", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_product_dto_1.CreateProductDto)
], TransactionsDto.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", user_dto_1.UserDTO)
], TransactionsDto.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transactions_entity_1.PaymentMethod),
    __metadata("design:type", String)
], TransactionsDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transactions_entity_1.Status),
    __metadata("design:type", String)
], TransactionsDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", warehouse_dto_1.WarehouseDTO)
], TransactionsDto.prototype, "warehouse", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "quantity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "amount", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "fee1", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "fee2", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "fee3", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TransactionsDto.prototype, "rewardPoints", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionsDto.prototype, "notes", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TransactionsDto.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TransactionsDto.prototype, "completedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TransactionsDto.prototype, "canceledAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TransactionsDto.prototype, "refundedAt", void 0);
exports.TransactionsDto = TransactionsDto;
//# sourceMappingURL=transactions.dto.js.map