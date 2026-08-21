import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductStatus } from 'src/product/entities/product.entity';
import { MetaParam } from 'src/common/file/interfaces';
export declare class PromotionService {
    private promotionRepo;
    private readonly classMapper;
    constructor(promotionRepo: Repository<Promotion>, classMapper: Mapper);
    create(user: any, createPromotionDto: CreatePromotionDto): Promise<{
        id: string;
    }>;
    getProductForPromotions(filter: string): Promise<any>;
    addImageToPromotion(id: string, userId: string, url: string): Promise<void>;
    findMain(): Promise<CreatePromotionDto>;
    findAll(filter: string, meta: MetaParam): Promise<{
        promotions: {
            product: {
                id: string;
                name: string;
            };
            id: string;
            name: string;
            description: string;
            action: string;
            isFirstPage: boolean;
            createdAt: Date;
            createdBy: import("../users/user.dto").UserDTO;
            status: ProductStatus;
            imageUrl: string;
            discount: number;
        }[];
        count: number;
    }>;
    findAllForUser(): Promise<CreatePromotionDto[]>;
    findOne(id: string): Promise<CreatePromotionDto>;
    update(id: string, updateProductDto: CreatePromotionDto): Promise<void>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
