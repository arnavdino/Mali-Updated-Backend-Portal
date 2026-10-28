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
exports.KitComponent = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const kit_entity_1 = require("./kit.entity");
let KitComponent = class KitComponent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KitComponent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kit_entity_1.Kit, (kit) => kit.components, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'kit_id' }),
    __metadata("design:type", kit_entity_1.Kit)
], KitComponent.prototype, "kit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], KitComponent.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'component_name' }),
    __metadata("design:type", String)
], KitComponent.prototype, "componentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_per_kit', type: 'decimal', precision: 12, scale: 3 }),
    __metadata("design:type", String)
], KitComponent.prototype, "quantityPerKit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KitComponent.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', default: 0 }),
    __metadata("design:type", Number)
], KitComponent.prototype, "displayOrder", void 0);
KitComponent = __decorate([
    (0, typeorm_1.Entity)('kit_component')
], KitComponent);
exports.KitComponent = KitComponent;
//# sourceMappingURL=kit-component.entity.js.map