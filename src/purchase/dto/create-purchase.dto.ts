import { AutoMap } from '@automapper/classes';
import { UserDTO } from 'src/users/user.dto';
import { PurchaseState } from '../entities/purchase.entity';
import { PurchaseProductDTO } from './purchase-product.dto';

export class PurchaseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  createdAt: string;
  @AutoMap()
  purchasedBy: UserDTO;
  
  @AutoMap()
  orders: PurchaseProductDTO[];

  @AutoMap()
  state: PurchaseState;

  @AutoMap()
  taxes: number;

  @AutoMap()
  total: number;
}
