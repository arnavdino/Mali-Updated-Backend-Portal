import { UserDTO } from 'src/users/user.dto';
import { Presentation, ProductStatus } from '../entities/product.entity';
export declare class CreateProductDto {
    id: string;
    name: string;
    numAvail: number;
    description: string;
    price: number;
    rewardRatio: number;
    unit: string;
    presentation: Presentation;
    createdAt: Date;
    level: string;
    status: ProductStatus;
    createdBy: UserDTO;
    parent: CreateProductDto;
    imageUrl: string;
    longDescription: string;
    sections: {
        [key: string]: string[];
    };
}
