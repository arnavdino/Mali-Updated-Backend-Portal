"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const promotion_controller_1 = require("./promotion.controller");
const promotion_mapper_1 = require("./promotion.mapper");
const casl_module_1 = require("../casl/casl.module");
const file_common_module_1 = require("../common/file/file-common.module");
const events_module_1 = require("../events/events.module");
const helpers_module_1 = require("../helpers/helpers.module");
const typeorm_1 = require("@nestjs/typeorm");
const promotion_entity_1 = require("./entities/promotion.entity");
const admin_promotion_controller_1 = require("./admin-promotion.controller");
let PromotionModule = class PromotionModule {
};
PromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([promotion_entity_1.Promotion]),
            helpers_module_1.HelpersModule,
            events_module_1.EventsModule,
            file_common_module_1.FilesCommonModule,
            casl_module_1.CaslModule,
        ],
        controllers: [promotion_controller_1.PromotionController, admin_promotion_controller_1.AdminPromotionController],
        providers: [promotion_service_1.PromotionService, promotion_mapper_1.PromotionProfile],
        exports: [promotion_service_1.PromotionService]
    })
], PromotionModule);
exports.PromotionModule = PromotionModule;
//# sourceMappingURL=promotion.module.js.map