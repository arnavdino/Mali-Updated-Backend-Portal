import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { VendorDTO } from './vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { LocationDTO } from 'src/users/location.dto';
import { LocationEntity } from 'src/users/location.entity';
import { WarehouseDTO } from './warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseManager } from './entities/warehouse.manger.entity';
import { WarehouseManagerDTO } from './warehouse-manger.dto';

@Injectable()
export class VendorMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        VendorDTO,
        Vendor,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationDTO, LocationEntity);
          }),
        ),
      );
      createMap(
        mapper,
        Vendor,
        VendorDTO,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationEntity, LocationDTO);
          }),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => {
            return this.mapper.map(src.warehouse, Warehouse, WarehouseDTO);
          }),
        ),
      );
      createMap(
        mapper,
        Warehouse,
        WarehouseDTO,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationEntity, LocationDTO);
          }),
        ),
      ),
        createMap(
          mapper,
          WarehouseDTO,
          Warehouse,
          forMember(
            (dest) => dest.location,
            mapFrom((src) => {
              return this.mapper.map(src.location, LocationDTO, LocationEntity);
            }),
          ),
        );
      createMap(
        mapper,
        WarehouseManagerDTO,
        WarehouseManager,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationDTO, LocationEntity);
          }),
        ),
      );
      createMap(
        mapper,
        WarehouseManager,
        WarehouseManagerDTO,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationEntity, LocationDTO);
          }),
        ),
        forMember(
          (dest) => dest.warehouse,
          mapFrom((src) => {
            return this.mapper.map(src.warehouse, Warehouse, WarehouseDTO);
          }),
        ),
      );
    };
  }
}
