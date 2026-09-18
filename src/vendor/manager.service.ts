import { BadRequestException, Injectable } from '@nestjs/common';
import { MetaParam } from 'src/common/file/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseManager } from './entities/warehouse.manger.entity';
import { WarehouseManagerDTO } from './warehouse-manger.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(WarehouseManager)
    private warehouseManagerRepository: Repository<WarehouseManager>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create(warehouseManagerDTO: WarehouseManagerDTO) {
    let entity = this.classMapper.map(
      warehouseManagerDTO,
      WarehouseManagerDTO,
      WarehouseManager,
    );
    entity.id = uuidv4();
    entity.warehouse = { id: warehouseManagerDTO.warehouse.id } as Warehouse;

    entity.age = moment().diff(entity.dob, `years`);

    entity.createdAt = new Date();

    entity = await this.warehouseManagerRepository.save(entity);
  }

  async findOne(id: string) {
    const warehouseManager = await this.warehouseManagerRepository.findOne(id, {
      relations: ['location', 'warehouse'],
    });
    return this.classMapper.map(
      warehouseManager,
      WarehouseManager,
      WarehouseManagerDTO,
    );
  }

  async changeStates({ ids, status }: { ids: string[]; status: string }) {
    if (!Array.isArray(ids) || ids.length === 0 || !['active', 'inactive'].includes(status)) {
      throw new BadRequestException('Invalid manager status update');
    }
    await this.warehouseManagerRepository.update({ id: In(ids) }, { status });
    //add event here
    return 'ok';
  }

  async update(id: string, warehouseManagerDTO: WarehouseManagerDTO) {
    let entity = this.classMapper.map(
      warehouseManagerDTO,
      WarehouseManagerDTO,
      WarehouseManager,
    );
    entity.id = id;
    entity.warehouse = { id: warehouseManagerDTO.warehouse.id } as Warehouse;

    entity.age = moment().diff(entity.dob, `years`);
    entity = await this.warehouseManagerRepository.save(entity);
  }

  async remove(id: string) {
    const warehouseManager = await this.warehouseManagerRepository.findOne(id);
    warehouseManager.deletedAt = new Date();
    warehouseManager.fname = '';
    warehouseManager.lname = '';
    warehouseManager.phone = '';

    await this.warehouseManagerRepository.save(warehouseManager);
    return 'done';
  }

  async getAll(filter: string, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }

    const query = this.warehouseManagerRepository
      .createQueryBuilder('warehouseManager')
      .innerJoin('warehouseManager.warehouse', 'warehouse')
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)
      .select([
        'warehouseManager.id',
        'warehouseManager.fname',
        'warehouseManager.lname',
        'warehouseManager.phone',
        'warehouseManager.status',
        'warehouseManager.deletedAt',
        'warehouse.name',
        'warehouse.id',
      ])
      .where('warehouseManager.deletedAt is null');

    if (filter?.includes('_@@')) {
      const requestedStatus = filter.replace('_@@', '');
      const status = requestedStatus === 'pending' ? 'inactive' : requestedStatus;
      if (!['active', 'inactive'].includes(status)) throw new BadRequestException('invalid filter');
      query.andWhere('warehouseManager.status = :status', { status });
    } else if (filter) {
      query.andWhere('(warehouseManager.fname like :filter or warehouseManager.lname like :filter)', { filter: `%${filter}%` });
    }

    const [results, count] = await query.getManyAndCount();
    let managers = results.map((p) =>
      this.classMapper.map(p, WarehouseManager, WarehouseManagerDTO),
    );
    return { managers, count };
  }
}
