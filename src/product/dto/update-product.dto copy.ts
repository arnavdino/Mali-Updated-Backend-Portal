import { AutoMap } from '@automapper/classes';
import { UserDTO } from 'src/users/user.dto';
import { Presentation, ProductStatus } from '../entities/product.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class updateProductDto {
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
  @IsEnum(Presentation)
  @IsOptional()
  presentation: Presentation;

  @AutoMap()
  createdAt: Date;

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
