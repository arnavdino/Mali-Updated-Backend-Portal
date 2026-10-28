import { UserDTO } from 'src/users/user.dto';
import { Presentation, ProductStatus } from '../entities/product.entity';
import { CreateProductDto } from './create-product.dto';
export declare class updateProductDto {
    name: string;
    numAvail: number;
    description: string;
    price: number;
    rewardRatio: number;
    presentation: Presentation;
    createdAt: Date;
    status: ProductStatus;
    createdBy: UserDTO;
    parent: CreateProductDto;
    imageUrl: string;
    longDescription: string;
    sections: {
        [key: string]: string[];
    };
}
