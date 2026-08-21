import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class LocationDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsNotEmpty()
  circle: string;

  @AutoMap()
  village: string;

  @AutoMap()
  @IsNotEmpty()
  common: string;

  @AutoMap()
  @IsNotEmpty()
  country: string;

  @AutoMap()
  region: string;
}
