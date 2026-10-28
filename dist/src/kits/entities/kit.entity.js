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
exports.Kit = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const kit_component_entity_1 = require("./kit-component.entity");
let Kit = class Kit {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Kit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Kit.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kit.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kit.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kit.prototype, "scenario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kit.prototype, "crop", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coverage_hectares', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", String)
], Kit.prototype, "coverageHectares", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_advance_fcfa', type: 'decimal', precision: 15, scale: 0, default: 0 }),
    __metadata("design:type", String)
], Kit.prototype, "unitAdvanceFcfa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repayment_quantity', type: 'decimal', precision: 12, scale: 3, default: 0 }),
    __metadata("design:type", String)
], Kit.prototype, "repaymentQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repayment_unit', default: 'kg' }),
    __metadata("design:type", String)
], Kit.prototype, "repaymentUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Kit.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Kit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => kit_component_entity_1.KitComponent, (component) => component.kit),
    __metadata("design:type", Array)
], Kit.prototype, "components", void 0);
Kit = __decorate([
    (0, typeorm_1.Entity)('kit')
], Kit);
exports.Kit = Kit;
//# sourceMappingURL=kit.entity.js.map