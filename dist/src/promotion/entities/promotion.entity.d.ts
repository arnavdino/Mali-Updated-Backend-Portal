import { Product, ProductStatus } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';
export declare class Promotion {
    id: string;
    name: string;
    description: string;
    isFirstPage: boolean;
    imageUrl: string;
    action: string;
    discount: number;
    createdAt: Date;
    createdBy: User;
    status: ProductStatus;
    product: Product;
}
