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
exports.VendorDTO = void 0;
const classes_1 = require("@automapper/classes");
const product_entity_1 = require("../product/entities/product.entity");
const location_dto_1 = require("../users/location.dto");
const warehouse_dto_1 = require("./warehouse.dto");
class VendorDTO {
}
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "managerName", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "methodOfPayment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "methodOfDelivery", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "methodOfSupply", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], VendorDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "transportContract", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "baseServices", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "seeds", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "fertilizer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "herbicide", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "phytosanitaryProduct", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "plowing", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "semi", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "fertilizerSpreading", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "phytoTreatment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "smallEquipment", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "insurance", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", location_dto_1.LocationDTO)
], VendorDTO.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "productSupplied", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], VendorDTO.prototype, "productPurchased", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", warehouse_dto_1.WarehouseDTO)
], VendorDTO.prototype, "warehouse", void 0);
exports.VendorDTO = VendorDTO;
//# sourceMappingURL=vendor.dto.js.map