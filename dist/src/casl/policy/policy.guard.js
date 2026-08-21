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
var PoliciesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesGuard = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const casl_ability_factory_1 = require("../casl-ability.factory");
const check_policy_decorator_1 = require("./check-policy.decorator");
let PoliciesGuard = PoliciesGuard_1 = class PoliciesGuard {
    constructor(reflector, caslAbilityFactory) {
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
        this.logger = new common_1.Logger(PoliciesGuard_1.name);
    }
    async canActivate(context) {
        const policyHandlers = this.reflector.get(check_policy_decorator_1.CHECK_POLICIES_KEY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.createForUser(user);
        return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
    }
    checkPermission(user, action, subj, object) {
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.can(action, (0, ability_1.subject)(subj, object))) {
            return true;
        }
        else {
            this.logger.warn(`User ${user.id} tried to ${action} ${subj} ${object.id} but was not allowed`);
            throw new common_1.HttpException(`You do not have permission to perform ${action} on the resource:${subj}`, 401);
        }
    }
    execPolicyHandler(handler, ability) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
};
PoliciesGuard = PoliciesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        casl_ability_factory_1.CaslAbilityFactory])
], PoliciesGuard);
exports.PoliciesGuard = PoliciesGuard;
//# sourceMappingURL=policy.guard.js.map