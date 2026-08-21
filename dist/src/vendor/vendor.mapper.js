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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMapper = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const vendor_dto_1 = require("./vendor.dto");
const vendor_entity_1 = require("./entities/vendor.entity");
const location_dto_1 = require("../users/location.dto");
const location_entity_1 = require("../users/location.entity");
const warehouse_dto_1 = require("./warehouse.dto");
const warehouse_entity_1 = require("./entities/warehouse.entity");
const warehouse_manger_entity_1 = require("./entities/warehouse.manger.entity");
const warehouse_manger_dto_1 = require("./warehouse-manger.dto");
let VendorMapper = class VendorMapper extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, vendor_dto_1.VendorDTO, vendor_entity_1.Vendor, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_dto_1.LocationDTO, location_entity_1.LocationEntity);
            })));
            (0, core_1.createMap)(mapper, vendor_entity_1.Vendor, vendor_dto_1.VendorDTO, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_entity_1.LocationEntity, location_dto_1.LocationDTO);
            })), (0, core_1.forMember)((dest) => dest.warehouse, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.warehouse, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO);
            })));
            (0, core_1.createMap)(mapper, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_entity_1.LocationEntity, location_dto_1.LocationDTO);
            }))),
                (0, core_1.createMap)(mapper, warehouse_dto_1.WarehouseDTO, warehouse_entity_1.Warehouse, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                    return this.mapper.map(src.location, location_dto_1.LocationDTO, location_entity_1.LocationEntity);
                })));
            (0, core_1.createMap)(mapper, warehouse_manger_dto_1.WarehouseManagerDTO, warehouse_manger_entity_1.WarehouseManager, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_dto_1.LocationDTO, location_entity_1.LocationEntity);
            })));
            (0, core_1.createMap)(mapper, warehouse_manger_entity_1.WarehouseManager, warehouse_manger_dto_1.WarehouseManagerDTO, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_entity_1.LocationEntity, location_dto_1.LocationDTO);
            })), (0, core_1.forMember)((dest) => dest.warehouse, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.warehouse, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO);
            })));
        };
    }
};
VendorMapper = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], VendorMapper);
exports.VendorMapper = VendorMapper;
//# sourceMappingURL=vendor.mapper.js.map