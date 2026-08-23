"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_module_1 = require("../events/events.module");
const users_module_1 = require("../users/users.module");
const helpers_module_1 = require("../helpers/helpers.module");
const transactions_entity_1 = require("./transactions.entity");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const transactions_mapper_1 = require("./transactions.mapper");
const casl_module_1 = require("../casl/casl.module");
let TransactionsModule = class TransactionsModule {
};
TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([transactions_entity_1.Transactions]),
            helpers_module_1.HelpersModule,
            events_module_1.EventsModule,
            casl_module_1.CaslModule,
            users_module_1.UsersModule
        ],
        providers: [transactions_service_1.TransactionsService, transactions_mapper_1.TransactionsProfile],
        controllers: [transactions_controller_1.TransactionsController],
        exports: [transactions_service_1.TransactionsService],
    })
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map