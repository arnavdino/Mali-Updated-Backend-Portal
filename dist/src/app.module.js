"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./authentication/auth.module");
const jwt_auth_gard_1 = require("./authentication/jwt-auth.gard");
const users_module_1 = require("./users/users.module");
const db_module_1 = require("./db/db.module");
const nestjs_1 = require("@automapper/nestjs");
const classes_1 = require("@automapper/classes");
const role_guard_1 = require("./authentication/role.guard");
const helpers_module_1 = require("./helpers/helpers.module");
const stripe_module_1 = require("./stripe/stripe.module");
const emails_module_1 = require("./emails/emails.module");
const events_module_1 = require("./events/events.module");
const product_module_1 = require("./product/product.module");
const role_module_1 = require("./roles/role.module");
const purchase_module_1 = require("./purchase/purchase.module");
const promotion_module_1 = require("./promotion/promotion.module");
const analytics_module_1 = require("./analytics/analytics.module");
const vendor_module_1 = require("./vendor/vendor.module");
const transactions_module_1 = require("./transactions/transactions.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.override', '.env', '.env.aws'],
                load: [db_module_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (Object.assign({}, configService.get('database'))),
                inject: [config_1.ConfigService],
            }),
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)(),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            helpers_module_1.HelpersModule,
            stripe_module_1.StripeModule,
            events_module_1.EventsModule,
            emails_module_1.EmailsModule,
            product_module_1.ProductModule,
            role_module_1.RoleModule,
            purchase_module_1.PurchaseModule,
            promotion_module_1.PromotionModule,
            analytics_module_1.AnalyticsModule,
            vendor_module_1.VendorModule,
            transactions_module_1.TransactionsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_gard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map