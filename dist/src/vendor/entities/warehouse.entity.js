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
exports.Warehouse = void 0;
const classes_1 = require("@automapper/classes");
const location_entity_1 = require("../../users/location.entity");
const typeorm_1 = require("typeorm");
let Warehouse = class Warehouse {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Warehouse.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'legal_form' }),
    __metadata("design:type", String)
], Warehouse.prototype, "legalForm", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'head_office' }),
    __metadata("design:type", String)
], Warehouse.prototype, "headOffice", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Warehouse.prototype, "capital", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'legal_rep' }),
    __metadata("design:type", String)
], Warehouse.prototype, "legalRep", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phone' }),
    __metadata("design:type", String)
], Warehouse.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'receipt_number' }),
    __metadata("design:type", String)
], Warehouse.prototype, "receiptNumber", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Warehouse.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => location_entity_1.LocationEntity, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.LocationEntity)
], Warehouse.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'villages_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "villagesSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'members_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "membersSummary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], Warehouse.prototype, "deletedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'potentail_area_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "potentialAreaSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'cultivated_area_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "cultivatedAreaSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'forecast_campaign_areas_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "forecastCampaignAreasSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'area_forecast_country_side_summary' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "areaForecastCountrySideSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'are_of_forecast_collective_fields' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "areaOfForecastCollectiveFields", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'area_of_collective_fields_exploited' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "areaOfCollectiveFieldsExploited", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total_production' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "totalProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'collectives_exploited' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "collectivesExploited", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Warehouse.prototype, "storage", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'weighing_equipment' }),
    __metadata("design:type", String)
], Warehouse.prototype, "weighingEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'blowing_equipment' }),
    __metadata("design:type", String)
], Warehouse.prototype, "blowingEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'means_of_transportation' }),
    __metadata("design:type", String)
], Warehouse.prototype, "meansOfTransportation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'distance_from_centralization_location' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "distanceFromCentralizationLocation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'distance_from_factory' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "distanceFromFactory", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'marketed_production' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "marketedProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'turn_over' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "turnOver", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fixed_charge_with_tax' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "fixedChargeWithTax", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'net_margin' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "netMargin", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'management_of_commitments' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "managementOfCommitments", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'access_to_financing' }),
    __metadata("design:type", Number)
], Warehouse.prototype, "accessToFinancing", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'other_products', type: 'text' }),
    __metadata("design:type", String)
], Warehouse.prototype, "otherProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'other_agr', type: 'text' }),
    __metadata("design:type", String)
], Warehouse.prototype, "otherAgr", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Warehouse.prototype, "createdAt", void 0);
Warehouse = __decorate([
    (0, typeorm_1.Entity)('warehouse')
], Warehouse);
exports.Warehouse = Warehouse;
//# sourceMappingURL=warehouse.entity.js.map