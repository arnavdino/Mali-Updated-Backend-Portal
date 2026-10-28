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
exports.Vendor = void 0;
const classes_1 = require("@automapper/classes");
const product_entity_1 = require("../../product/entities/product.entity");
const location_entity_1 = require("../../users/location.entity");
const typeorm_1 = require("typeorm");
const warehouse_entity_1 = require("./warehouse.entity");
let Vendor = class Vendor {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Vendor.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'manager_name' }),
    __metadata("design:type", String)
], Vendor.prototype, "managerName", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)((type) => product_entity_1.Product, (pr) => pr.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "products", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'organization', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'method_of_payment', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "methodOfPayment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'method_of_delivery', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "methodOfDelivery", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'method_of_supply', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "methodOfSupply", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phone' }),
    __metadata("design:type", String)
], Vendor.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Vendor.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'status', default: 'inactive' }),
    __metadata("design:type", String)
], Vendor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], Vendor.prototype, "deletedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'transport_contract', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "transportContract", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'basic_services', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "baseServices", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'seeds', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "seeds", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fertilizer', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "fertilizer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'herbicide', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "herbicide", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phystosanitary_product', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "phytosanitaryProduct", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'plowing', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "plowing", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'semi', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "semi", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fertilizer_spreading', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "fertilizerSpreading", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phyto_treatment', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "phytoTreatment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'small_equipment', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "smallEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'insurance', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "insurance", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToOne)((type) => location_entity_1.LocationEntity, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.LocationEntity)
], Vendor.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => warehouse_entity_1.Warehouse),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], Vendor.prototype, "warehouse", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'product_supplied', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "productSupplied", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'product_purchased', nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "productPurchased", void 0);
Vendor = __decorate([
    (0, typeorm_1.Entity)('vendor')
], Vendor);
exports.Vendor = Vendor;
//# sourceMappingURL=vendor.entity.js.map