import { AutoMap } from '@automapper/classes';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class PurchaseProductDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  product: CreateProductDto;

  @AutoMap()
  total: number;
  @AutoMap()
  quantity: number;

  @AutoMap()
  notes: string;
}
