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
exports.KitsController = void 0;
const common_1 = require("@nestjs/common");
const check_policy_decorator_1 = require("../casl/policy/check-policy.decorator");
const policy_guard_1 = require("../casl/policy/policy.guard");
const helpers_service_1 = require("../helpers/helpers.service");
const permissions_1 = require("../permissions/permissions");
const create_kit_dto_1 = require("./dto/create-kit.dto");
const kits_service_1 = require("./kits.service");
let KitsController = class KitsController {
    constructor(kitsService, helpers) {
        this.kitsService = kitsService;
        this.helpers = helpers;
    }
    create(dto, req, res) {
        return this.helpers.formatResponse(console, this.kitsService.create(req.user, dto), res, 'create kit');
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(policy_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(permissions_1.PermissionAction.create, permissions_1.PermissionSubject.product)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kit_dto_1.CreateKitDto, Object, Object]),
    __metadata("design:returntype", void 0)
], KitsController.prototype, "create", null);
KitsController = __decorate([
    (0, common_1.Controller)('admin/kits'),
    __metadata("design:paramtypes", [kits_service_1.KitsService, helpers_service_1.HelpersService])
], KitsController);
exports.KitsController = KitsController;
//# sourceMappingURL=kits.controller.js.map