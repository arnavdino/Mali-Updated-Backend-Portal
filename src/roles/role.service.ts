import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';

export enum Role {
  USER = 'Farmer',
  ADMIN = 'Administrator',
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,
    private configService: ConfigService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async findRole(role: Role) {
    return await this.roleRepo.findOne({ where: { name: role } });
  }

  async getRoles() {
    return (await this.roleRepo.find()).map((r) =>
      this.classMapper.map(r, RoleEntity, RoleDto),
    );
  }

  async getRole(id: number) {
    return this.classMapper.map(
      await this.roleRepo.findOne(id),
      RoleEntity,
      RoleDto,
    );
  }

  async createRole(role: RoleDto) {
    let newRole: RoleEntity = await this.classMapper.map(
      role,
      RoleDto,
      RoleEntity,
    );

    await this.roleRepo.save(newRole);
  }

  async modifyRole(id: number, role: RoleDto) {
    let existingRole = await this.roleRepo.findOne(id);
    if (!existingRole) {
      throw Error('Cannot modify a role that does not exist');
    }
    let newRole: RoleEntity = await this.classMapper.map(
      role,
      RoleDto,
      RoleEntity,
    );
    existingRole.name = newRole.name;
    existingRole.description = newRole.description;
    existingRole.permissions = newRole.permissions;
    await this.roleRepo.save(existingRole);
  }
  async deleteRole(id: number) {
    if (id == +this.configService.get('PRODUCT_ID')) {
      throw new BadRequestException('Cannot delete this default role');
    }
    await this.roleRepo.delete(id);
  }
}
