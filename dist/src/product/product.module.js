"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_user_controller_1 = require("./product-user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const helpers_module_1 = require("../helpers/helpers.module");
const events_module_1 = require("../events/events.module");
const casl_module_1 = require("../casl/casl.module");
const product_mapper_1 = require("./product.mapper");
const file_common_module_1 = require("../common/file/file-common.module");
const promotion_module_1 = require("../promotion/promotion.module");
const product_admin_controller_1 = require("./product-admin.controller");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            helpers_module_1.HelpersModule,
            events_module_1.EventsModule,
            file_common_module_1.FilesCommonModule,
            casl_module_1.CaslModule,
            promotion_module_1.PromotionModule,
        ],
        controllers: [product_user_controller_1.ProductController, product_admin_controller_1.ProductAdminController],
        providers: [product_service_1.ProductService, product_mapper_1.ProductProfile],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map