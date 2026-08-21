import { PaymentMethod, Status, Transactions } from './transactions.entity';
import { Repository } from 'typeorm';
import { TransactionsDto } from './transactions.dto';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';
import { MetaParam, TransactionFilter } from 'src/common/file/interfaces';
import { User } from '../users/user.entity';
export declare class TransactionsService {
    private transactionRepo;
    private userRepository;
    private configService;
    private readonly classMapper;
    constructor(transactionRepo: Repository<Transactions>, userRepository: Repository<User>, configService: ConfigService, classMapper: Mapper);
    getTransaction(id: string): Promise<TransactionsDto>;
    createTransaction(transaction: TransactionsDto): Promise<void>;
    modifyTransaction(id: string, transaction: TransactionsDto): Promise<void>;
    findAllForAdmin(filter: TransactionFilter, meta: MetaParam): Promise<{
        transactions: {
            customer: string;
            vendor: string;
            product: string;
            warehouse: string;
            unit: string;
            id: string;
            category: string;
            status: Status;
            payment: PaymentMethod;
            quantity: number;
            amount: number;
            fee1: number;
            fee2: number;
            fee3: number;
            rewardPoints: number;
            availableRewardPoints: number;
            notes: string;
            createdBy: string;
            createdAt: Date;
            completedAt: Date;
            canceledAt: Date;
            refundedAt: Date;
        }[];
        count: number;
    }>;
}
