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
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_module_1 = require("../events/events.module");
const helpers_module_1 = require("../helpers/helpers.module");
const stripe_module_1 = require("../stripe/stripe.module");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const user_mapper_1 = require("./user.mapper");
const users_service_1 = require("./users.service");
const role_module_1 = require("../roles/role.module");
const file_common_module_1 = require("../common/file/file-common.module");
const admin_user_controller_1 = require("./admin-user.controller");
const casl_module_1 = require("../casl/casl.module");
let UsersModule = class UsersModule {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async onModuleInit() {
    }
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            helpers_module_1.HelpersModule,
            stripe_module_1.StripeModule,
            events_module_1.EventsModule,
            role_module_1.RoleModule,
            file_common_module_1.FilesCommonModule,
            casl_module_1.CaslModule,
        ],
        providers: [users_service_1.UsersService, user_mapper_1.UserProfile],
        controllers: [user_controller_1.UserController, admin_user_controller_1.AdminUserController],
        exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map