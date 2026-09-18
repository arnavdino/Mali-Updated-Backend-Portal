import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase, PurchaseState } from './entities/purchase.entity';
import { ILike, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/user.entity';
import { PurchaseProduct } from './entities/purchase-product.entity';
import { ProductService } from 'src/product/product.service';
import StripeService from 'src/stripe/stripe.service';
import { MetaParam, TransactionFilter } from 'src/common/file/interfaces';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
    @InjectRepository(PurchaseProduct)
    private transactionRepo: Repository<PurchaseProduct>,
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly stripeService: StripeService,

    private readonly productService: ProductService,
  ) {}
  async create(createPurchaseDto: PurchaseDto, userId: string) {
    let purchase: Purchase = this.classMapper.map(
      createPurchaseDto,
      PurchaseDto,
      Purchase,
    );
    purchase.id = uuidv4();
    purchase.createdAt = new Date();
    purchase.purchasedBy = { id: userId } as User;
    purchase.state = PurchaseState.COMPLETED;
    purchase.orders = await Promise.all(
      purchase.orders.map(async (o) => {
        const total =
          (await this.productService.findOne(o.product.id)).product.price *
          o.quantity;
        return {
          ...o,
          total,
          taxes: total * 0.13,
          state: PurchaseState.COMPLETED,
        };
      }),
    );
    purchase.total = purchase.orders.reduce((a, b) => a + b.total, 0);
    purchase.taxes = purchase.total * 0.13;
    purchase.total += purchase.taxes;
    purchase.chargeId = ''; // here we need to call stripe.
    await this.purchaseRepo.save(purchase);
    return purchase.id;
  }

  async findCategories() {
    return await this.transactionRepo.query(
      `select name,id from product where id in (select parent_id from purchase_product pp inner join product p on p.id = pp.product_id group by parent_id )`,
    );
  }

  async findStatuses() {
    return (
      await this.transactionRepo.query(
        `select state from purchase_product  group by state`,
      )
    ).map((e) => e.state);
  }

  async findAll(userId: string) {
    return (
      await this.purchaseRepo.find({
        where: { purchasedBy: { id: userId } },
        relations: ['orders', 'orders.product', 'orders.product.parent'],
        take: 30,
        order: { createdAt: 'DESC' },
      })
    ).map((p) => this.classMapper.map(p, Purchase, PurchaseDto));
  }

  async initiateRefuned(transactionId) {
    await this.transactionRepo.update(transactionId, {
      state: PurchaseState.PENDING_REFUND,
    });
  }
  async confrimRefund(transactionId, notes: string) {
    await this.transactionRepo.update(transactionId, {
      state: PurchaseState.REFUNDED,
      notes,
    });
  }

  async declineRefund(transactionId, notes: string) {
    await this.transactionRepo.update(transactionId, {
      state: PurchaseState.COMPLETED,
      notes,
    });
  }

  async findAllForAdmin(filter: TransactionFilter, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }

    const where: string[] = [];
    const parameters: Record<string, string | number> = {};
    if (filter.from) {
      where.push('purchase.createdAt > :from');
      parameters.from = filter.from;
    }
    if (filter.to) {
      where.push('purchase.createdAt < :to');
      parameters.to = filter.to;
    }
    if (filter.type) {
      where.push('product.parent_id = :type');
      parameters.type = filter.type;
    }
    if (filter.customer) {
      where.push('(user.fname like :customer or user.lname like :customer)');
      parameters.customer = `%${filter.customer}%`;
    }
    if (filter.id) {
      const id = Number(filter.id);
      if (!Number.isInteger(id)) throw new BadRequestException('Invalid purchase id');
      where.push('purchaseProduct.id = :id');
      parameters.id = id;
    }
    if (filter.state) {
      if (!Object.values(PurchaseState).includes(filter.state as PurchaseState)) {
        throw new BadRequestException('Invalid purchase status');
      }
      where.push('purchaseProduct.state = :state');
      parameters.state = filter.state;
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
      .where(where.join(' and ') || '1 = 1', parameters)
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

  async findOne(id: string) {
    return this.classMapper.map(
      await this.purchaseRepo.findOne(id),
      Purchase,
      PurchaseDto,
    );
  }

  async update(id: string, updatePurchaseDto: PurchaseDto) {
    let purchase: Purchase = this.classMapper.map(
      updatePurchaseDto,
      PurchaseDto,
      Purchase,
    );
    purchase.id = id;
    await this.purchaseRepo.save(purchase);
  }

  async remove(id: string) {
    await this.purchaseRepo.delete(id);
  }

  async getTaxes(total: number) {
    return total * 0.13;
  }
}
