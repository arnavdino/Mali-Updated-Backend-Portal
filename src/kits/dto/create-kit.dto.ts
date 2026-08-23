import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class KitComponentDto {
  @IsString()
  @IsNotEmpty()
  componentName: string;

  @IsNumber()
  quantityPerKit: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

export class CreateKitDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() reference: string;
  @IsString() @IsNotEmpty() campaign: string;
  @IsString() @IsNotEmpty() scenario: string;
  @IsString() @IsNotEmpty() crop: string;
  @IsNumber() coverageHectares: number;
  @IsNumber() price: number;
  @IsNumber() @IsOptional() unitAdvanceFcfa?: number;
  @IsNumber() @IsOptional() repaymentQuantity?: number;
  @IsString() @IsOptional() repaymentUnit?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() categoryId?: string;
  @IsBoolean() @IsOptional() isActive?: boolean;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => KitComponentDto)
  components: KitComponentDto[];
}
