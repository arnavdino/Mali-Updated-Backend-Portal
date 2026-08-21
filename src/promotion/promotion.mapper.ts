import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreatePromotionDto,
        Promotion,
        forMember(
          (dest) => dest.imageUrl,
          mapFrom((src) => {
            return src.imageUrl || '';
          }),
        ),
      );
      createMap(mapper, Promotion, CreatePromotionDto);
    };
  }
}
