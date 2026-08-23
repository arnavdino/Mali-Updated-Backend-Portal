import { User } from 'src/users/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/vendor/entities/warehouse.entity';
export declare enum PaymentMethod {
    CASH = "CASH",
    REWARD_POINTS = "REWARD_POINTS"
}
export declare enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    PENDING_REFUND = "PENDING_REFUND",
    REFUNDED = "REFUNDED",
    CANCELED = "CANCELED"
}
export declare class Transactions {
    id: string;
    customer: User;
    vendor: Vendor;
    product: Product;
    category: Product;
    createdBy: User;
    paymentMethod: PaymentMethod;
    status: Status;
    warehouse: Warehouse;
    quantity: number;
    amount: number;
    fee1: number;
    fee2: number;
    fee3: number;
    rewardPoints: number;
    notes: string;
    completedAt: Date;
    canceledAt: Date;
    refundedAt: Date;
    createdAt: Date;
}
