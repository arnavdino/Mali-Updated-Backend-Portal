import { BadRequestException, Injectable } from '@nestjs/common';
import { MetaParam } from 'src/common/file/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseDTO } from './warehouse.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create(warehouseDTO: WarehouseDTO) {
    let entity = this.classMapper.map(warehouseDTO, WarehouseDTO, Warehouse);
    entity.createdAt = new Date();
    entity = await this.warehouseRepository.save(entity);
  }

  async findOne(id: string) {
    const warehouse = await this.warehouseRepository.findOne(id, {
      relations: ['location'],
    });
    return this.classMapper.map(warehouse, Warehouse, WarehouseDTO);
  }

  async changeStates({ ids, status }: { ids: string[]; status: string }) {
    await this.warehouseRepository.query(
      `update warehouse set status = '${status}' where id in (${ids
        .map((id) => `'${id}'`)
        .join(',')})`,
    );
    //add event here
    return 'ok';
  }

  async update(id: number, warehouseDTO: WarehouseDTO) {
    let entity = this.classMapper.map(warehouseDTO, WarehouseDTO, Warehouse);
    console.log(entity);
    entity.id = +id;

    entity = await this.warehouseRepository.save(entity);
    return 'done';
  }

  async remove(id: string) {
    const warehouse = await this.warehouseRepository.findOne(id);
    warehouse.deletedAt = new Date();
    warehouse.name = '';
    await this.warehouseRepository.remove(warehouse);
    return 'done';
  }

  async getAll(filter: string, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }

    const [results, count] = await this.warehouseRepository
      .createQueryBuilder('warehouse')
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)
      .select([
        'warehouse.id',
        'warehouse.name',
        'warehouse.phone',
        'warehouse.legalForm',
        'warehouse.capital',
        'warehouse.deletedAt',
      ])
      .where(
        `warehouse.deletedAt is null ${
          filter
            ? filter.includes('_@@')
              ? ` and warehouse.status = '${filter.replace('_@@', '')}'`
              : ` and warehouse.name like "%${filter}%"`
            : ''
        } `,
      )
      .getManyAndCount();

    let warehouses = results.map((p) =>
      this.classMapper.map(p, Warehouse, WarehouseDTO),
    );
    return { warehouses, count };
  }

  async search(search: string) {
    let results = await this.warehouseRepository
      .createQueryBuilder('warehouse')
      .where('warehouse.name like :search', {
        search: `%${search}%`,
      })
      .take(50)
      .orderBy('warehouse.createdAt', 'DESC')
      .select([
        'warehouse.id',
        'warehouse.name',
        'warehouse.phone',
        'warehouse.legalForm',
        'warehouse.capital',
        'warehouse.deletedAt',
      ])
      .getMany();
    return results.map((p) => this.classMapper.map(p, Warehouse, WarehouseDTO));
  }
}
