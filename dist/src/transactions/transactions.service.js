"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_entity_1 = require("./transactions.entity");
const typeorm_2 = require("typeorm");
const transactions_dto_1 = require("./transactions.dto");
const nestjs_1 = require("@automapper/nestjs");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionRepo, userRepository, productRepository, configService, classMapper) {
        this.transactionRepo = transactionRepo;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.configService = configService;
        this.classMapper = classMapper;
    }
    async getTransaction(id) {
        return this.classMapper.map(await this.transactionRepo.findOne(id), transactions_entity_1.Transactions, transactions_dto_1.TransactionsDto);
    }
    async createTransaction(transaction, createdById) {
        var _a, _b, _c;
        const quantity = Number(transaction.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) {
            throw new common_1.BadRequestException('Quantity must be greater than zero');
        }
        if (!((_a = transaction.product) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new common_1.BadRequestException('A product is required');
        }
        const product = await this.productRepository.findOne(transaction.product.id, {
            relations: ['parent'],
        });
        if (!product || product.status !== product_entity_1.ProductStatus.ACTIVE) {
            throw new common_1.BadRequestException('The selected product is unavailable');
        }
        if (((_b = transaction.category) === null || _b === void 0 ? void 0 : _b.id) && ((_c = product.parent) === null || _c === void 0 ? void 0 : _c.id) !== transaction.category.id) {
            throw new common_1.BadRequestException('The selected category does not match the product');
        }
        const fees = [transaction.fee1, transaction.fee2, transaction.fee3].map((fee) => Number(fee || 0));
        if (fees.some((fee) => !Number.isFinite(fee) || fee < 0)) {
            throw new common_1.BadRequestException('Transaction fees cannot be negative');
        }
        let newTransaction = await this.classMapper.map(transaction, transactions_dto_1.TransactionsDto, transactions_entity_1.Transactions);
        newTransaction.id = (0, uuid_1.v4)();
        newTransaction.quantity = quantity;
        newTransaction.amount = Number(product.price);
        newTransaction.fee1 = fees[0];
        newTransaction.fee2 = fees[1];
        newTransaction.fee3 = fees[2];
        newTransaction.status = transactions_entity_1.Status.PENDING;
        newTransaction.createdBy = { id: createdById };
        newTransaction.category = product.parent || null;
        newTransaction.rewardPoints =
            transaction.paymentMethod === transactions_entity_1.PaymentMethod.REWARD_POINTS
                ? 0
                : Math.floor(newTransaction.amount * quantity * Number(product.rewardRatio || 0));
        await this.transactionRepo.save(newTransaction);
        return { id: newTransaction.id };
    }
    async modifyTransaction(id, transaction) {
        let existingTransaction = await this.transactionRepo.findOne(id);
        if (!existingTransaction) {
            throw Error('Cannot modify a transaction that does not exist');
        }
        let newTransaction = await this.classMapper.map(transaction, transactions_dto_1.TransactionsDto, transactions_entity_1.Transactions);
        let rewards = (await this.transactionRepo.query(`Select transactions.amount as amt,
      transactions.quantity as qtt,
      transactions.fee_1 as f1,
      transactions.fee_2 as f2,
      transactions.fee_3 as f3,
      transactions.payment_method as tpm,
      transactions.reward_points as trp,
      transactions.customer_id as uid,
      user.location_id as ulid,
      user.reward_points as urp
      from transactions inner join user
      on user.id = transactions.customer_id
      where transactions.id = ?`, [id]))[0];
        if (!rewards) {
            throw Error('Cannot find transaction rewards');
        }
        let amt = rewards.amt;
        let qtt = rewards.qtt;
        let f1 = rewards.f1;
        let f2 = rewards.f2;
        let f3 = rewards.f3;
        let tpm = rewards.tpm;
        let uid = rewards.uid;
        let trp = rewards.trp;
        let urp = rewards.urp;
        if (newTransaction.status === transactions_entity_1.Status.COMPLETED) {
            newTransaction.completedAt = new Date();
            if (existingTransaction.status === transactions_entity_1.Status.PENDING) {
                urp = tpm === transactions_entity_1.PaymentMethod.REWARD_POINTS ? urp - Math.ceil(amt * qtt + f1 + f2 + f3) : urp + trp;
            }
        }
        else if (newTransaction.status === transactions_entity_1.Status.CANCELED) {
            newTransaction.canceledAt = new Date();
        }
        else if (newTransaction.status === transactions_entity_1.Status.REFUNDED) {
            newTransaction.refundedAt = new Date();
            urp = urp - trp;
        }
        await this.transactionRepo.save(newTransaction);
        await this.userRepository.update({ id: uid }, { rewardPoints: urp });
    }
    async findAllForAdmin(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        const where = [];
        const parameters = {};
        if (filter.from) {
            where.push('transactions.createdAt >= :from');
            parameters.from = filter.from;
        }
        if (filter.to) {
            where.push('transactions.createdAt <= :to');
            parameters.to = filter.to;
        }
        if (filter.type) {
            where.push('transactions.product_category = :type');
            parameters.type = filter.type;
        }
        if (filter.customer) {
            where.push("concat(customer.fname, ' ', customer.lname) like :customer");
            parameters.customer = `%${filter.customer}%`;
        }
        if (filter.id) {
            where.push('transactions.id = :id');
            parameters.id = filter.id;
        }
        if (filter.state) {
            if (!Object.values(transactions_entity_1.Status).includes(filter.state)) {
                throw Error('Invalid transaction status');
            }
            where.push('transactions.status = :state');
            parameters.state = filter.state;
        }
        const [transactions, count] = await this.transactionRepo
            .createQueryBuilder('transactions')
            .innerJoin('transactions.vendor', 'vendor')
            .innerJoin('transactions.category', 'category')
            .innerJoin('transactions.product', 'product')
            .innerJoin('transactions.warehouse', 'warehouse')
            .innerJoin('transactions.createdBy', 'user')
            .innerJoin('transactions.customer', 'customer')
            .skip(meta.rowsPerPage * (meta.page - 1))
            .take(meta.rowsPerPage)
            .select([
            'user.id',
            'customer.fname',
            'customer.lname',
            'customer.rewardPoints',
            'vendor.name',
            'product.id',
            'product.name',
            'product.unit',
            'product.productKind',
            'warehouse.name',
            'transactions.id',
            'category.name',
            'transactions.status',
            'transactions.paymentMethod',
            'transactions.quantity',
            'transactions.amount',
            'transactions.fee1',
            'transactions.fee2',
            'transactions.fee3',
            'transactions.rewardPoints',
            'transactions.notes',
            'user.fname',
            'user.lname',
            'transactions.createdAt',
            'transactions.completedAt',
            'transactions.canceledAt',
            'transactions.refundedAt',
        ])
            .where(where.join(' and ') || '1 = 1', parameters)
            .orderBy('transactions.createdAt', 'DESC')
            .getManyAndCount();
        return {
            transactions: transactions.map((t) => ({
                customer: t.customer.fname + ' ' + t.customer.lname,
                vendor: t.vendor.name,
                product: t.product.name,
                productId: t.product.id,
                productKind: t.product.productKind,
                warehouse: t.warehouse.name,
                unit: t.product.unit,
                id: t.id,
                category: t.category.name,
                status: t.status,
                payment: t.paymentMethod,
                quantity: t.quantity,
                amount: t.amount,
                fee1: t.fee1,
                fee2: t.fee2,
                fee3: t.fee3,
                rewardPoints: t.rewardPoints,
                availableRewardPoints: t.customer.rewardPoints,
                notes: t.notes,
                createdBy: t.createdBy.fname + ' ' + t.createdBy.lname,
                createdAt: t.createdAt,
                completedAt: t.completedAt,
                canceledAt: t.canceledAt,
                refundedAt: t.refundedAt,
            })),
            count,
        };
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transactions)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService, Object])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map