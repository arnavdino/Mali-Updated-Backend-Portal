import { UserDTO } from 'src/users/user.dto';
import { PurchaseState } from '../entities/purchase.entity';
import { PurchaseProductDTO } from './purchase-product.dto';
export declare class PurchaseDto {
    id: string;
    createdAt: string;
    purchasedBy: UserDTO;
    orders: PurchaseProductDTO[];
    state: PurchaseState;
    taxes: number;
    total: number;
}
