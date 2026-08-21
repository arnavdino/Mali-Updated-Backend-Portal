import { Product } from 'src/product/entities/product.entity';
import { Purchase, PurchaseState } from './purchase.entity';
export declare class PurchaseProduct {
    id: number;
    product: Product;
    purchase: Purchase;
    quantity: number;
    total: number;
    state: PurchaseState;
    taxes: number;
    notes: string;
}
