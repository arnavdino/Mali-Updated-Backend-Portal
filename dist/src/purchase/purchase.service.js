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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("./entities/purchase.entity");
const typeorm_2 = require("typeorm");
const nestjs_1 = require("@automapper/nestjs");
const uuid_1 = require("uuid");
const purchase_product_entity_1 = require("./entities/purchase-product.entity");
const product_service_1 = require("../product/product.service");
const stripe_service_1 = require("../stripe/stripe.service");
let PurchaseService = class PurchaseService {
    constructor(purchaseRepo, transactionRepo, classMapper, stripeService, productService) {
        this.purchaseRepo = purchaseRepo;
        this.transactionRepo = transactionRepo;
        this.classMapper = classMapper;
        this.stripeService = stripeService;
        this.productService = productService;
    }
    async create(createPurchaseDto, userId) {
        let purchase = this.classMapper.map(createPurchaseDto, create_purchase_dto_1.PurchaseDto, purchase_entity_1.Purchase);
        purchase.id = (0, uuid_1.v4)();
        purchase.createdAt = new Date();
        purchase.purchasedBy = { id: userId };
        purchase.state = purchase_entity_1.PurchaseState.COMPLETED;
        purchase.orders = await Promise.all(purchase.orders.map(async (o) => {
            const total = (await this.productService.findOne(o.product.id)).product.price *
                o.quantity;
            return Object.assign(Object.assign({}, o), { total, taxes: total * 0.13, state: purchase_entity_1.PurchaseState.COMPLETED });
        }));
        purchase.total = purchase.orders.reduce((a, b) => a + b.total, 0);
        purchase.taxes = purchase.total * 0.13;
        purchase.total += purchase.taxes;
        purchase.chargeId = '';
        await this.purchaseRepo.save(purchase);
        return purchase.id;
    }
    async findCategories() {
        return await this.transactionRepo.query(`select name,id from product where id in (select parent_id from purchase_product pp inner join product p on p.id = pp.product_id group by parent_id )`);
    }
    async findStatuses() {
        return (await this.transactionRepo.query(`select state from purchase_product  group by state`)).map((e) => e.state);
    }
    async findAll(userId) {
        return (await this.purchaseRepo.find({
            where: { purchasedBy: { id: userId } },
            relations: ['orders', 'orders.product', 'orders.product.parent'],
            take: 30,
            order: { createdAt: 'DESC' },
        })).map((p) => this.classMapper.map(p, purchase_entity_1.Purchase, create_purchase_dto_1.PurchaseDto));
    }
    async initiateRefuned(transactionId) {
        await this.transactionRepo.update(transactionId, {
            state: purchase_entity_1.PurchaseState.PENDING_REFUND,
        });
    }
    async confrimRefund(transactionId, notes) {
        await this.transactionRepo.update(transactionId, {
            state: purchase_entity_1.PurchaseState.REFUNDED,
            notes,
        });
    }
    async declineRefund(transactionId, notes) {
        await this.transactionRepo.update(transactionId, {
            state: purchase_entity_1.PurchaseState.COMPLETED,
            notes,
        });
    }
    async findAllForAdmin(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        let where = '';
        if (filter.from) {
            where = `purchase.createdAt > '${filter.from}'`;
        }
        if (filter.to) {
            where += `${!!where ? ' and' : ''} purchase.createdAt <  '${filter.to}'`;
        }
        if (filter.type) {
            where += `${!!where ? ' and' : ''} product.parent = '${filter.type}'`;
        }
        if (filter.customer) {
            where += `${!!where ? ' and' : ''} (user.fname like '%${filter.customer}%' or user.lname like '%${filter.customer}%')`;
        }
        if (filter.id) {
            where += `${!!where ? ' and' : ''} purchaseProduct.id = ${filter.id}`;
        }
        if (filter.state) {
            where += `${!!where ? ' and' : ''} purchaseProduct.state = '${filter.state}'`;
        }
        const [transactions, count] = await this.transactionRepo
            .createQueryBuilder('purchaseProduct')
            .innerJoin('purchaseProduct.purchase', 'purchase')
            .innerJoin('purchase.purchasedBy', 'user')
            .innerJoin('purchaseProduct.product', 'product')
            .innerJoin('product.parent', 'parent')
            .orderBy('purchase.createdAt', 'DESC')
            .skip(meta.rowsPerPage * (meta.page - 1))
            .take(meta.rowsPerPage)
            .select([
            'purchase.createdAt',
            'user.fname',
            'user.lname',
            'purchaseProduct.state',
            'parent.name',
            'purchaseProduct.total',
            'purchaseProduct.id',
            'purchaseProduct.notes',
            'product.name',
        ])
            .where(where)
            .getManyAndCount();
        return {
            transactions: transactions.map((t) => ({
                id: t.id,
                total: t.total,
                customer: `${t.purchase.purchasedBy.fname} ${t.purchase.purchasedBy.lname}`,
                createdAt: t.purchase.createdAt,
                category: t.product.name,
                state: t.state,
                notes: t.notes,
            })),
            count,
        };
    }
    async findOne(id) {
        return this.classMapper.map(await this.purchaseRepo.findOne(id), purchase_entity_1.Purchase, create_purchase_dto_1.PurchaseDto);
    }
    async update(id, updatePurchaseDto) {
        let purchase = this.classMapper.map(updatePurchaseDto, create_purchase_dto_1.PurchaseDto, purchase_entity_1.Purchase);
        purchase.id = id;
        await this.purchaseRepo.save(purchase);
    }
    async remove(id) {
        await this.purchaseRepo.delete(id);
    }
    async getTaxes(total) {
        return total * 0.13;
    }
};
PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_product_entity_1.PurchaseProduct)),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, stripe_service_1.default,
        product_service_1.ProductService])
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map