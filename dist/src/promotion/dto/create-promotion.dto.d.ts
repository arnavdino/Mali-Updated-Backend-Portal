import { CreateProductDto } from '../../product/dto/create-product.dto';
import { ProductStatus } from '../../product/entities/product.entity';
import { UserDTO } from '../../users/user.dto';
export declare class CreatePromotionDto {
    id: string;
    name: string;
    description: string;
    action: string;
    isFirstPage: boolean;
    createdAt: Date;
    createdBy: UserDTO;
    product: CreateProductDto;
    status: ProductStatus;
    imageUrl: string;
    discount: number;
}
