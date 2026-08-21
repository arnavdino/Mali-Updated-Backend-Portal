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

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async createTransaction(transaction: TransactionsDto) {
    let newTransaction: Transactions = await this.classMapper.map(
      transaction,
      TransactionsDto,
      Transactions,
    );
    newTransaction.id = uuidv4();
    await this.transactionRepo.save(newTransaction);
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
      where transactions.id = "${id}"`,
    ))[0];
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

    let where = '';
    if (filter.from) {
      where = `transactions.createdAt >= '${filter.from}'`;
    }
    if (filter.to) {
      where += `${!!where ? ' and' : ''} transactions.createdAt <= '${
        filter.to
      }'`;
    }
    if (filter.type) {
      where += `${!!where ? ' and' : ''} transactions.category = '${
        filter.type
      }'`;
    }
    if (filter.customer) {
      where += `${!!where ? ' and' : ''} (transactions.customerName like '%${
        filter.customer
      }%')`;
    }
    if (filter.id) {
      where += `${!!where ? ' and' : ''} transactions.id = '${filter.id}'`;
    }
    if (filter.state) {
      where += `${!!where ? ' and' : ''} transactions.status = '${
        filter.state
      }'`;
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
        'product.name',
        'product.unit',
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
      .where(where)
      .orderBy('transactions.createdAt', 'DESC')
      .getManyAndCount();
    return {
      transactions: transactions.map((t) => ({
        customer: t.customer.fname + ' ' + t.customer.lname,
        vendor: t.vendor.name,
        product: t.product.name,
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
