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
exports.LocationEntity = void 0;
const classes_1 = require("@automapper/classes");
const typeorm_1 = require("typeorm");
let LocationEntity = class LocationEntity {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], LocationEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'circle' }),
    __metadata("design:type", String)
], LocationEntity.prototype, "circle", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'common', nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "common", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'village' }),
    __metadata("design:type", String)
], LocationEntity.prototype, "village", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'region', nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "region", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'country' }),
    __metadata("design:type", String)
], LocationEntity.prototype, "country", void 0);
LocationEntity = __decorate([
    (0, typeorm_1.Entity)('location')
], LocationEntity);
exports.LocationEntity = LocationEntity;
//# sourceMappingURL=location.entity.js.map