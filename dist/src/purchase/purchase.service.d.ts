import { PurchaseDto } from './dto/create-purchase.dto';
import { Purchase, PurchaseState } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PurchaseProduct } from './entities/purchase-product.entity';
import { ProductService } from 'src/product/product.service';
import StripeService from 'src/stripe/stripe.service';
import { MetaParam, TransactionFilter } from 'src/common/file/interfaces';
export declare class PurchaseService {
    private purchaseRepo;
    private transactionRepo;
    private readonly classMapper;
    private readonly stripeService;
    private readonly productService;
    constructor(purchaseRepo: Repository<Purchase>, transactionRepo: Repository<PurchaseProduct>, classMapper: Mapper, stripeService: StripeService, productService: ProductService);
    create(createPurchaseDto: PurchaseDto, userId: string): Promise<string>;
    findCategories(): Promise<any>;
    findStatuses(): Promise<any>;
    findAll(userId: string): Promise<PurchaseDto[]>;
    initiateRefuned(transactionId: any): Promise<void>;
    confrimRefund(transactionId: any, notes: string): Promise<void>;
    declineRefund(transactionId: any, notes: string): Promise<void>;
    findAllForAdmin(filter: TransactionFilter, meta: MetaParam): Promise<{
        transactions: {
            id: number;
            total: number;
            customer: string;
            createdAt: Date;
            category: string;
            state: PurchaseState;
            notes: string;
        }[];
        count: number;
    }>;
    findOne(id: string): Promise<PurchaseDto>;
    update(id: string, updatePurchaseDto: PurchaseDto): Promise<void>;
    remove(id: string): Promise<void>;
    getTaxes(total: number): Promise<number>;
}
