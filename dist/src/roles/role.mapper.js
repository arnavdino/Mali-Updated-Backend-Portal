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
exports.RoleProfile = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const role_dto_1 = require("./role.dto");
const role_entity_1 = require("./role.entity");
let RoleProfile = class RoleProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, role_dto_1.RoleDto, role_entity_1.RoleEntity, (0, core_1.forMember)((dest) => dest.permissions, (0, core_1.mapFrom)((src) => {
                return src.permissions;
            })));
            (0, core_1.createMap)(mapper, role_entity_1.RoleEntity, role_dto_1.RoleDto, (0, core_1.forMember)((dest) => dest.permissions, (0, core_1.mapFrom)((src) => {
                return src.permissions;
            })));
        };
    }
};
RoleProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], RoleProfile);
exports.RoleProfile = RoleProfile;
//# sourceMappingURL=role.mapper.js.map