import { AutoMap } from '@automapper/classes';
import { User } from 'src/users/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/vendor/entities/warehouse.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

export enum PaymentMethod {
  CASH = 'CASH',
  REWARD_POINTS = "REWARD_POINTS"
}

export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  PENDING_REFUND = "PENDING_REFUND",
  REFUNDED = 'REFUNDED',
  CANCELED = 'CANCELED',
}

@Entity('transactions')
export class Transactions {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @AutoMap()
  @ManyToOne((type) => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @AutoMap()
  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @AutoMap()
  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product_category' })
  category: Product;

  @AutoMap()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @AutoMap()
  @Column({ name: 'payment_method' })
  paymentMethod: PaymentMethod;

  @AutoMap()
  @Column({ name: 'status' })
  status: Status;

  @AutoMap()
  @ManyToOne((type) => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @AutoMap()
  @Column({ name: 'quantity', type: 'float' })
  quantity: number;

  @AutoMap()
  @Column({ name: 'amount', type: 'float' })
  amount: number;

  @AutoMap()
  @Column({ name: 'fee_1', default: 0, type: 'float' })
  fee1: number;

  @AutoMap()
  @Column({ name: 'fee_2', default: 0, type: 'float' })
  fee2: number;

  @AutoMap()
  @Column({ name: 'fee_3', default: 0, type: 'float' })
  fee3: number;

  @AutoMap()
  @Column({ name: 'reward_points', default: 0, type: 'int' })
  rewardPoints: number;

  @AutoMap()
  @Column({ name: 'notes', default: '' })
  notes: string;

  @AutoMap()
  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @AutoMap()
  @Column({ name: 'canceled_at', nullable: true })
  canceledAt: Date;

  @AutoMap()
  @Column({ name: 'refunded_at', nullable: true })
  refundedAt: Date;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
