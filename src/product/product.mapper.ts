import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateProductDto,
        Product,
        forMember(
          (dest) => dest.imageUrl,
          mapFrom((src) => {
            return src.imageUrl || '';
          }),
        ),
        forMember(
          (dest) => dest.numAvail,
          mapFrom((src) => {
            return Number.isInteger(src.numAvail) ? src.numAvail : -1;
          }),
        ),
        forMember(
          (dest) => dest.sections,
          mapFrom((src) => {
            return src.sections;
          }),
        ),
      );
      createMap(mapper, Product, CreateProductDto);
    };
  }
}
