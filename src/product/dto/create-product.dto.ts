import { AutoMap } from '@automapper/classes';
import { UserDTO } from 'src/users/user.dto';
import { Presentation, ProductStatus } from '../entities/product.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateProductDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  numAvail: number;

  @AutoMap()
  description: string;

  @AutoMap()
  price: number;

  @AutoMap()
  rewardRatio: number;

  @AutoMap()
  unit: string;

  @AutoMap()
  @IsEnum(Presentation)
  @IsOptional()
  presentation: Presentation;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  level: string;

  @AutoMap()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @AutoMap()
  createdBy: UserDTO;

  @AutoMap()
  parent: CreateProductDto;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  longDescription: string;
  @AutoMap()
  sections: { [key: string]: string[] };
}
