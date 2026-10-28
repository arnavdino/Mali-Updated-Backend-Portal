"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const helpers_module_1 = require("../helpers/helpers.module");
const casl_module_1 = require("../casl/casl.module");
const product_entity_1 = require("../product/entities/product.entity");
const kit_component_entity_1 = require("./entities/kit-component.entity");
const kit_entity_1 = require("./entities/kit.entity");
const kits_controller_1 = require("./kits.controller");
const kits_service_1 = require("./kits.service");
let KitsModule = class KitsModule {
};
KitsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([kit_entity_1.Kit, kit_component_entity_1.KitComponent, product_entity_1.Product]),
            helpers_module_1.HelpersModule,
            casl_module_1.CaslModule,
        ],
        controllers: [kits_controller_1.KitsController],
        providers: [kits_service_1.KitsService],
        exports: [kits_service_1.KitsService],
    })
], KitsModule);
exports.KitsModule = KitsModule;
//# sourceMappingURL=kits.module.js.map