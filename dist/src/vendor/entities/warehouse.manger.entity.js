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
exports.WarehouseManager = void 0;
const classes_1 = require("@automapper/classes");
const location_entity_1 = require("../../users/location.entity");
const typeorm_1 = require("typeorm");
const warehouse_entity_1 = require("./warehouse.entity");
let WarehouseManager = class WarehouseManager {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WarehouseManager.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fname' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "fname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'lname' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "lname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phone' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'dob' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "dob", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'age', default: 0 }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "age", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'schooled', default: false }),
    __metadata("design:type", Boolean)
], WarehouseManager.prototype, "schooled", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'organization', nullable: true }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WarehouseManager.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'gender', nullable: true }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "gender", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'nina', nullable: true }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "nina", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'num_of_children', default: 0 }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "numOfChildren", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'marital_status', default: '' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "maritalStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'language', default: 'en' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => location_entity_1.LocationEntity, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.LocationEntity)
], WarehouseManager.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], WarehouseManager.prototype, "deletedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'literacy_level' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "literacyLevel", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total_products' }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "totalProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'other_income_activities', type: 'text' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "otherIncomActivities", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'facilitation_activity', type: 'text' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "facilitationActivity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'other_suppliers', type: 'text' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "otherSuppliers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'local_organizations' }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "localOrganizations", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "infrastructure", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'logistics_and_production_means', type: 'text' }),
    __metadata("design:type", String)
], WarehouseManager.prototype, "logisticsAndProductionMeans", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'surface_area_of_farm' }),
    __metadata("design:type", Number)
], WarehouseManager.prototype, "surfaceAreaOfFarm", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarehouseManager.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarehouseManager.prototype, "headquarters", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => warehouse_entity_1.Warehouse),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], WarehouseManager.prototype, "warehouse", void 0);
WarehouseManager = __decorate([
    (0, typeorm_1.Entity)('warehouse_manager')
], WarehouseManager);
exports.WarehouseManager = WarehouseManager;
//# sourceMappingURL=warehouse.manger.entity.js.map