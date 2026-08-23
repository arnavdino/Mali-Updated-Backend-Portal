"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModule = void 0;
const common_1 = require("@nestjs/common");
const vendor_service_1 = require("./vendor.service");
const vendor_entity_1 = require("./entities/vendor.entity");
const typeorm_1 = require("@nestjs/typeorm");
const warehouse_entity_1 = require("./entities/warehouse.entity");
const warehouse_manger_entity_1 = require("./entities/warehouse.manger.entity");
const admin_vendor_controller_1 = require("./admin-vendor.controller");
const vendor_mapper_1 = require("./vendor.mapper");
const helpers_module_1 = require("../helpers/helpers.module");
const casl_module_1 = require("../casl/casl.module");
const warehouse_service_1 = require("./warehouse.service");
const admin_warehouse_controller_1 = require("./admin-warehouse.controller");
const admin_manager_controller_copy_1 = require("./admin-manager.controller copy");
const manager_service_1 = require("./manager.service");
let VendorModule = class VendorModule {
};
VendorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vendor_entity_1.Vendor, warehouse_entity_1.Warehouse, warehouse_manger_entity_1.WarehouseManager]),
            helpers_module_1.HelpersModule,
            casl_module_1.CaslModule,
        ],
        controllers: [admin_vendor_controller_1.AdminVendorController, admin_warehouse_controller_1.AdminWarehouseController, admin_manager_controller_copy_1.AdminManagerController],
        providers: [vendor_service_1.VendorService, vendor_mapper_1.VendorMapper, warehouse_service_1.WarehouseService, manager_service_1.ManagerService],
    })
], VendorModule);
exports.VendorModule = VendorModule;
//# sourceMappingURL=vendor.module.js.map