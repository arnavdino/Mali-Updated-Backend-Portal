import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseProductDTO } from './dto/purchase-product.dto';
import { PurchaseProduct } from './entities/purchase-product.entity';
import { ProductService } from 'src/product/product.service';
import * as moment from 'moment-timezone';

@Injectable()
export class PurchaseProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() mapper: Mapper,
    private readonly productService: ProductService,
  ) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, PurchaseProduct, PurchaseProductDTO);

      createMap(mapper, PurchaseProductDTO, PurchaseProduct);
      createMap(
        mapper,
        PurchaseDto,
        Purchase,
        forMember(
          (dest) => dest.orders,
          mapFrom((src) => {
            return src.orders.map((o) => ({
              ...mapper.map(o, PurchaseProductDTO, PurchaseProduct),
              product: { id: o.product.id },
            }));
          }),
        ),
      );
      createMap(
        mapper,
        Purchase,
        PurchaseDto,
        forMember(
          (dest) => dest.orders,
          mapFrom((src) => {
            return src.orders?.map((o) => ({
              ...mapper.map(o, PurchaseProduct, PurchaseProductDTO),
              product: this.productService.mapDao(o.product),
            }));
          }),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => {
            return moment
              .tz(src.createdAt, 'America/Toronto')
              .format('ddd, DD MMM yyyy');
          }),
        ),
      );
    };
  }
}
