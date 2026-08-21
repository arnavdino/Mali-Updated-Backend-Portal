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
exports.RoleService = exports.Role = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./role.entity");
const typeorm_2 = require("typeorm");
const role_dto_1 = require("./role.dto");
const nestjs_1 = require("@automapper/nestjs");
const config_1 = require("@nestjs/config");
var Role;
(function (Role) {
    Role["USER"] = "Farmer";
    Role["ADMIN"] = "Administrator";
})(Role = exports.Role || (exports.Role = {}));
let RoleService = class RoleService {
    constructor(roleRepo, configService, classMapper) {
        this.roleRepo = roleRepo;
        this.configService = configService;
        this.classMapper = classMapper;
    }
    async findRole(role) {
        return await this.roleRepo.findOne({ where: { name: role } });
    }
    async getRoles() {
        return (await this.roleRepo.find()).map((r) => this.classMapper.map(r, role_entity_1.RoleEntity, role_dto_1.RoleDto));
    }
    async getRole(id) {
        return this.classMapper.map(await this.roleRepo.findOne(id), role_entity_1.RoleEntity, role_dto_1.RoleDto);
    }
    async createRole(role) {
        let newRole = await this.classMapper.map(role, role_dto_1.RoleDto, role_entity_1.RoleEntity);
        await this.roleRepo.save(newRole);
    }
    async modifyRole(id, role) {
        let existingRole = await this.roleRepo.findOne(id);
        if (!existingRole) {
            throw Error('Cannot modify a role that does not exist');
        }
        let newRole = await this.classMapper.map(role, role_dto_1.RoleDto, role_entity_1.RoleEntity);
        existingRole.name = newRole.name;
        existingRole.description = newRole.description;
        existingRole.permissions = newRole.permissions;
        await this.roleRepo.save(existingRole);
    }
    async deleteRole(id) {
        if (id == +this.configService.get('PRODUCT_ID')) {
            throw new common_1.BadRequestException('Cannot delete this default role');
        }
        await this.roleRepo.delete(id);
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService, Object])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map