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
exports.WarehouseDTO = void 0;
const classes_1 = require("@automapper/classes");
const location_dto_1 = require("../users/location.dto");
class WarehouseDTO {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "legalForm", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "headOffice", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "capital", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "legalRep", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "receiptNumber", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "members", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", location_dto_1.LocationDTO)
], WarehouseDTO.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "villagesSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "membersSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "potentialAreaSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "cultivatedAreaSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "forecastCampaignAreasSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "areaForecastCountrySideSummary", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "areaOfForecastCollectiveFields", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "areaOfCollectiveFieldsExploited", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "totalProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "collectivesExploited", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "storage", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "weighingEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "blowingEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "meansOfTransportation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "distanceFromCentralizationLocation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "distanceFromFactory", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "marketedProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "turnOver", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "fixedChargeWithTax", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "netMargin", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "managementOfCommitments", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseDTO.prototype, "accessToFinancing", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "otherProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "otherAgr", void 0);
exports.WarehouseDTO = WarehouseDTO;
//# sourceMappingURL=warehouse.dto.js.map