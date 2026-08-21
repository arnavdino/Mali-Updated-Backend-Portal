import { AutoMap } from '@automapper/classes';
import { CreateProductDto } from '../../product/dto/create-product.dto';
import { ProductStatus } from '../../product/entities/product.entity';
import { UserDTO } from '../../users/user.dto';

export class CreatePromotionDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  action: string;

  @AutoMap()
  isFirstPage: boolean;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  createdBy: UserDTO;

  @AutoMap()
  product: CreateProductDto;

  @AutoMap()
  status: ProductStatus;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  discount: number;
}
