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
exports.WarehouseManagerDTO = void 0;
const classes_1 = require("@automapper/classes");
const warehouse_dto_1 = require("./warehouse.dto");
class WarehouseManagerDTO {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "fname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "lname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "dob", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "age", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], WarehouseManagerDTO.prototype, "schooled", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], WarehouseManagerDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "gender", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "nina", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", warehouse_dto_1.WarehouseDTO)
], WarehouseManagerDTO.prototype, "warehouse", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "numOfChildren", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "maritalStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "language", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], WarehouseManagerDTO.prototype, "deleted", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "literacyLevel", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "totalProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "otherIncomActivities", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "facilitationActivity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "otherSuppliers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "localOrganizations", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "infrastructure", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "logisticsAndProductionMeans", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], WarehouseManagerDTO.prototype, "surfaceAreaOfFarm", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WarehouseManagerDTO.prototype, "headquarters", void 0);
exports.WarehouseManagerDTO = WarehouseManagerDTO;
//# sourceMappingURL=warehouse-manger.dto.js.map