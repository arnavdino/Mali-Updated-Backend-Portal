import { BadRequestException, Injectable } from '@nestjs/common';
import { MetaParam } from 'src/common/file/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { VendorDTO } from './vendor.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async createVendor(vendorDTO: VendorDTO) {
    let entity = this.classMapper.map(vendorDTO, VendorDTO, Vendor);
    entity.id = uuidv4();
    entity.warehouse = { id: vendorDTO.warehouse.id } as Warehouse;

    entity.createdAt = new Date();

    entity = await this.vendorRepository.save(entity);
  }

  async findOne(id: string) {
    const vendor = await this.vendorRepository.findOne(id, {
      relations: ['location', 'warehouse'],
    });
    return this.classMapper.map(vendor, Vendor, VendorDTO);
  }

  async changeVendorsState({ ids, status }: { ids: string[]; status: string }) {
    await this.vendorRepository.query(
      `update vendor set status = '${status}' where id in (${ids
        .map((id) => `'${id}'`)
        .join(',')})`,
    );
    //add event here
    return 'ok';
  }

  async update(id: string, vendorDTO: VendorDTO) {
    let entity = this.classMapper.map(vendorDTO, VendorDTO, Vendor);
    entity.id = id;
    entity.warehouse = { id: vendorDTO.warehouse.id } as Warehouse;

    entity = await this.vendorRepository.save(entity);
  }

  async remove(id: string) {
    const vendor = await this.vendorRepository.findOne(id);
    vendor.deletedAt = new Date();
    vendor.name = '';

    await this.vendorRepository.save(vendor);
    return 'done';
  }

  async getVendors(filter: string, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }

    const [results, count] = await this.vendorRepository
      .createQueryBuilder('vendor')
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)
      .select([
        'vendor.id',
        'vendor.name',
        'vendor.phone',
        'vendor.status',
        'vendor.managerName',
        'vendor.deletedAt',
      ])
      .where(
        `vendor.deletedAt is null ${
          filter
            ? filter.includes('_@@')
              ? ` and vendor.status = '${filter.replace('_@@', '')}'`
              : ` and vendor.name like "%${filter}%"`
            : ''
        } `,
      )
      .getManyAndCount();

    let vendors = results.map((p) =>
      this.classMapper.map(p, Vendor, VendorDTO),
    );
    return { vendors, count };
  }

  async search(search: string) {
    let results = await this.vendorRepository
      .createQueryBuilder('vendor')
      .where('vendor.name like :search', {
        search: `%${search}%`,
      })
      .take(50)
      .orderBy('vendor.createdAt', 'DESC')
      .select([
        'vendor.id',
        'vendor.name',
        'vendor.phone',
        'vendor.status',
        'vendor.managerName',
        'vendor.deletedAt',
      ])
      .getMany();
    return results.map((p) => this.classMapper.map(p, Vendor, VendorDTO));
  }
}
