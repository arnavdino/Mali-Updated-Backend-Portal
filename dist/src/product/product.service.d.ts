import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductStatus } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PromotionService } from 'src/promotion/promotion.service';
import { MetaParam } from 'src/common/file/interfaces';
export declare class ProductService {
    private productRepo;
    private readonly classMapper;
    private readonly promotionService;
    constructor(productRepo: Repository<Product>, classMapper: Mapper, promotionService: PromotionService);
    create(user: any, createProductDto: CreateProductDto): Promise<{
        id: string;
    }>;
    mapDao(product: Product): {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        unit: string;
        description: string;
    };
    search(search: string, category?: string): Promise<CreateProductDto[]>;
    findMain(): Promise<{
        mainProducts: any;
        featuredProducts: CreateProductDto[];
        promotion: import("../promotion/dto/create-promotion.dto").CreatePromotionDto;
    }>;
    getFeaturedProducts(): Promise<any>;
    getActiveProducts(): Promise<any>;
    getRevenueSummary(): Promise<any>;
    getLast12Months(): Promise<{
        data: any[];
        thisYear: string;
        lastYear: string;
    }>;
    getLast10Transactions(): Promise<any>;
    addImageToProduct(id: string, userId: string, url: string): Promise<void>;
    findAllForUser(filter: string): Promise<{
        products: CreateProductDto[];
        categories: any;
        loadMore: boolean;
        skip: number;
    }>;
    getCategories(filter: string, parentId?: string, includeSubs?: boolean): Promise<any>;
    findAll(filter: string, meta: MetaParam): Promise<{
        products: CreateProductDto[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        product: CreateProductDto;
    }>;
    update(id: string, updateProductDto: CreateProductDto): Promise<void>;
    remove(id: string): Promise<string>;
    removeBatch(ids: string[]): Promise<string>;
    changeStateBatch(ids: string[], state: ProductStatus): Promise<string>;
    searchCategories(search: string): Promise<CreateProductDto[]>;
}
