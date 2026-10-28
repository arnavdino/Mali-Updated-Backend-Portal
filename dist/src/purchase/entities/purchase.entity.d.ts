import { User } from 'src/users/user.entity';
import { PurchaseProduct } from './purchase-product.entity';
export declare enum PurchaseState {
    PENDING = "pending",
    COMPLETED = "completed",
    REFUNDED = "refunded",
    PENDING_REFUND = "pending_refund",
    DECLINE = "declined"
}
export declare class Purchase {
    id: string;
    createdAt: Date;
    purchasedBy: User;
    state: PurchaseState;
    taxes: number;
    total: number;
    chargeId: string;
    orders: PurchaseProduct[];
}
