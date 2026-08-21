import { AutoMap } from '@automapper/classes';
import { IsEnum, IsOptional } from 'class-validator';
import { VendorDTO } from 'src/vendor/vendor.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { WarehouseDTO } from 'src/vendor/warehouse.dto';
import { PaymentMethod, Status } from './transactions.entity';
import { UserDTO } from 'src/users/user.dto';

export class TransactionsDto {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsOptional()
  customer: UserDTO;

  @AutoMap()
  @IsOptional()
  vendor: VendorDTO;

  @AutoMap()
  @IsOptional()
  product: CreateProductDto;

  @AutoMap()
  @IsOptional()
  category: CreateProductDto;

  @AutoMap()
  @IsOptional()
  createdBy: UserDTO;

  @AutoMap()
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @AutoMap()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @AutoMap()
  @IsOptional()
  warehouse: WarehouseDTO;

  @AutoMap()
  @IsOptional()
  quantity: number;

  @AutoMap()
  @IsOptional()
  amount: number;

  @AutoMap()
  @IsOptional()
  fee1: number;

  @AutoMap()
  @IsOptional()
  fee2: number;

  @AutoMap()
  @IsOptional()
  fee3: number;

  @AutoMap()
  @IsOptional()
  rewardPoints: number;

  @AutoMap()
  @IsOptional()
  notes: string;

  @AutoMap()
  @IsOptional()
  createdAt: Date;

  @AutoMap()
  @IsOptional()
  completedAt: Date;

  @AutoMap()
  @IsOptional()
  canceledAt: Date;

  @AutoMap()
  @IsOptional()
  refundedAt: Date;
}
