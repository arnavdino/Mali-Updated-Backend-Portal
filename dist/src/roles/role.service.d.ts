import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';
export declare enum Role {
    USER = "Farmer",
    ADMIN = "Administrator"
}
export declare class RoleService {
    private roleRepo;
    private configService;
    private readonly classMapper;
    constructor(roleRepo: Repository<RoleEntity>, configService: ConfigService, classMapper: Mapper);
    findRole(role: Role): Promise<RoleEntity>;
    getRoles(): Promise<RoleDto[]>;
    getRole(id: number): Promise<RoleDto>;
    createRole(role: RoleDto): Promise<void>;
    modifyRole(id: number, role: RoleDto): Promise<void>;
    deleteRole(id: number): Promise<void>;
}
