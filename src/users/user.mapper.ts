import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { LocationDTO } from './location.dto';
import { LocationEntity } from './location.entity';
import { userStatus } from '../common/file/interfaces';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, LocationDTO, LocationEntity);
      createMap(mapper, LocationEntity, LocationDTO);
      createMap(
        mapper,
        User,
        UserDTO,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationEntity, LocationDTO);
          }),
        ),
        forMember(
          (dest) => dest.status,
          mapFrom((src) => {
            return src.verified ? userStatus.ACTIVE : userStatus.INACTIVE;
          }),
        ),
      );
      createMap(
        mapper,
        UserDTO,
        User,
        forMember(
          (dest) => dest.location,
          mapFrom((src) => {
            return this.mapper.map(src.location, LocationDTO, LocationEntity);
          }),
        ),
      );
    };
  }
}
