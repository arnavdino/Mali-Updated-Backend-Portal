"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_service_1 = require("./purchase.service");
const purchase_controller_1 = require("./purchase.controller");
const helpers_module_1 = require("../helpers/helpers.module");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("./entities/purchase.entity");
const purchase_mapper_1 = require("./purchase.mapper");
const events_module_1 = require("../events/events.module");
const casl_module_1 = require("../casl/casl.module");
const product_module_1 = require("../product/product.module");
const stripe_module_1 = require("../stripe/stripe.module");
const purchase_admin_controller_1 = require("./purchase-admin.controller");
const purchase_product_entity_1 = require("./entities/purchase-product.entity");
let PurchaseModule = class PurchaseModule {
};
PurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helpers_module_1.HelpersModule,
            typeorm_1.TypeOrmModule.forFeature([purchase_entity_1.Purchase]),
            typeorm_1.TypeOrmModule.forFeature([purchase_product_entity_1.PurchaseProduct]),
            events_module_1.EventsModule,
            casl_module_1.CaslModule,
            product_module_1.ProductModule,
            stripe_module_1.StripeModule,
        ],
        controllers: [purchase_controller_1.PurchaseController, purchase_admin_controller_1.PurchaseAdminController],
        providers: [purchase_service_1.PurchaseService, purchase_mapper_1.PurchaseProfile],
    })
], PurchaseModule);
exports.PurchaseModule = PurchaseModule;
//# sourceMappingURL=purchase.module.js.map