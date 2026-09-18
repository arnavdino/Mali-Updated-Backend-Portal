import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Level,
  Presentation,
  ProductKind,
  ProductStatus,
} from '../entities/product.entity';

class ProductParentDto {
  @IsString()
  id: string;
}

export class CreateProductDto {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  numAvail: number;

  @AutoMap()
  @IsString()
  @IsOptional()
  description: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rewardRatio: number;

  @AutoMap()
  @IsString()
  unit: string;

  @AutoMap()
  @IsEnum(Presentation)
  @IsOptional()
  presentation: Presentation;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  @IsEnum(Level)
  level: string;

  @AutoMap()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @AutoMap()
  @IsEnum(ProductKind)
  @IsOptional()
  productKind?: ProductKind;

  @AutoMap()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductParentDto)
  parent: CreateProductDto;

  @AutoMap()
  @IsString()
  @IsOptional()
  imageUrl: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  longDescription: string;

  @AutoMap()
  @IsObject()
  @IsOptional()
  sections: { [key: string]: string[] };
}
