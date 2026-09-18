import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod, Status, Transactions } from './transactions.entity';
import { Repository } from 'typeorm';
import { TransactionsDto } from './transactions.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { MetaParam, TransactionFilter } from 'src/common/file/interfaces';
import { User } from '../users/user.entity';
import { Product, ProductStatus } from '../product/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private configService: ConfigService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getTransaction(id: string) {
    return this.classMapper.map(
      await this.transactionRepo.findOne(id),
      Transactions,
      TransactionsDto,
    );
  }

  async createTransaction(transaction: TransactionsDto, createdById: string) {
    const quantity = Number(transaction.quantity);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }
    if (!transaction.product?.id) {
      throw new BadRequestException('A product is required');
    }

    const product = await this.productRepository.findOne(transaction.product.id, {
      relations: ['parent'],
    });
    if (!product || product.status !== ProductStatus.ACTIVE) {
      throw new BadRequestException('The selected product is unavailable');
    }
    if (transaction.category?.id && product.parent?.id !== transaction.category.id) {
      throw new BadRequestException('The selected category does not match the product');
    }

    const fees = [transaction.fee1, transaction.fee2, transaction.fee3].map(
      (fee) => Number(fee || 0),
    );
    if (fees.some((fee) => !Number.isFinite(fee) || fee < 0)) {
      throw new BadRequestException('Transaction fees cannot be negative');
    }

    let newTransaction: Transactions = await this.classMapper.map(
      transaction,
      TransactionsDto,
      Transactions,
    );
    newTransaction.id = uuidv4();
    newTransaction.quantity = quantity;
    newTransaction.amount = Number(product.price);
    newTransaction.fee1 = fees[0];
    newTransaction.fee2 = fees[1];
    newTransaction.fee3 = fees[2];
    newTransaction.status = Status.PENDING;
    newTransaction.createdBy = { id: createdById } as User;
    newTransaction.category = product.parent || null;
    newTransaction.rewardPoints =
      transaction.paymentMethod === PaymentMethod.REWARD_POINTS
        ? 0
        : Math.floor(newTransaction.amount * quantity * Number(product.rewardRatio || 0));
    await this.transactionRepo.save(newTransaction);
    return { id: newTransaction.id };
  }

  async modifyTransaction(id: string, transaction: TransactionsDto) {
    let existingTransaction = await this.transactionRepo.findOne(id);
    if (!existingTransaction) {
      throw Error('Cannot modify a transaction that does not exist');
    }
    let newTransaction: Transactions = await this.classMapper.map(
      transaction,
      TransactionsDto,
      Transactions,
    );

    let rewards = (await this.transactionRepo.query(
      `Select transactions.amount as amt,
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
      where transactions.id = ?`,
      [id],
    ))[0];
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

    if (newTransaction.status === Status.COMPLETED) {
      newTransaction.completedAt = new Date();
      if (existingTransaction.status === Status.PENDING) {
        urp = tpm === PaymentMethod.REWARD_POINTS? urp - Math.ceil(amt * qtt + f1 + f2 + f3) : urp + trp;
      }
    } else if (newTransaction.status === Status.CANCELED) {
      newTransaction.canceledAt = new Date();
    } else if (newTransaction.status === Status.REFUNDED) {
      newTransaction.refundedAt = new Date();
      urp = urp - trp;
    }
    await this.transactionRepo.save(newTransaction);

    await this.userRepository.update(
      { id: uid },
      { rewardPoints: urp }
    );
  }

  async findAllForAdmin(filter: TransactionFilter, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }

    const where: string[] = [];
    const parameters: Record<string, string> = {};
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
      if (!Object.values(Status).includes(filter.state as Status)) {
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
}
