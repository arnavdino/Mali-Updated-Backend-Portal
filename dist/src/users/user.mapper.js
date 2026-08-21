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
exports.UserProfile = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const user_dto_1 = require("./user.dto");
const location_dto_1 = require("./location.dto");
const location_entity_1 = require("./location.entity");
const interfaces_1 = require("../common/file/interfaces");
let UserProfile = class UserProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, location_dto_1.LocationDTO, location_entity_1.LocationEntity);
            (0, core_1.createMap)(mapper, location_entity_1.LocationEntity, location_dto_1.LocationDTO);
            (0, core_1.createMap)(mapper, user_entity_1.User, user_dto_1.UserDTO, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_entity_1.LocationEntity, location_dto_1.LocationDTO);
            })), (0, core_1.forMember)((dest) => dest.status, (0, core_1.mapFrom)((src) => {
                return src.verified ? interfaces_1.userStatus.ACTIVE : interfaces_1.userStatus.INACTIVE;
            })));
            (0, core_1.createMap)(mapper, user_dto_1.UserDTO, user_entity_1.User, (0, core_1.forMember)((dest) => dest.location, (0, core_1.mapFrom)((src) => {
                return this.mapper.map(src.location, location_dto_1.LocationDTO, location_entity_1.LocationEntity);
            })));
        };
    }
};
UserProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], UserProfile);
exports.UserProfile = UserProfile;
//# sourceMappingURL=user.mapper.js.map