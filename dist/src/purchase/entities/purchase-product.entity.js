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
exports.PurchaseProduct = void 0;
const classes_1 = require("@automapper/classes");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const purchase_entity_1 = require("./purchase.entity");
let PurchaseProduct = class PurchaseProduct {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], PurchaseProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => purchase_entity_1.Purchase),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_id' }),
    __metadata("design:type", purchase_entity_1.Purchase)
], PurchaseProduct.prototype, "purchase", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "quantity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total', type: 'float' }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "total", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'state' }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "state", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'taxes', type: 'float' }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "taxes", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "notes", void 0);
PurchaseProduct = __decorate([
    (0, typeorm_1.Entity)('purchase_product')
], PurchaseProduct);
exports.PurchaseProduct = PurchaseProduct;
//# sourceMappingURL=purchase-product.entity.js.map