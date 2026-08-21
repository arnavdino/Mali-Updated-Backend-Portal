import { VendorDTO } from 'src/vendor/vendor.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { WarehouseDTO } from 'src/vendor/warehouse.dto';
import { PaymentMethod, Status } from './transactions.entity';
import { UserDTO } from 'src/users/user.dto';
export declare class TransactionsDto {
    id: string;
    customer: UserDTO;
    vendor: VendorDTO;
    product: CreateProductDto;
    category: CreateProductDto;
    createdBy: UserDTO;
    paymentMethod: PaymentMethod;
    status: Status;
    warehouse: WarehouseDTO;
    quantity: number;
    amount: number;
    fee1: number;
    fee2: number;
    fee3: number;
    rewardPoints: number;
    notes: string;
    createdAt: Date;
    completedAt: Date;
    canceledAt: Date;
    refundedAt: Date;
}
