import { AutoMap } from '@automapper/classes';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { PurchaseProduct } from './purchase-product.entity';

export enum PurchaseState {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  PENDING_REFUND = 'pending_refund',
  DECLINE = 'declined',
}

@Entity('purchase')
export class Purchase {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'purchased_by' })
  purchasedBy: User;

  @AutoMap()
  @Column({ name: 'state' })
  state: PurchaseState;

  @AutoMap()
  @Column({ name: 'taxes', type: 'float' })
  taxes: number;

  @AutoMap()
  @Column({ name: 'total', type: 'float' })
  total: number;

  @Column({ name: 'charge_id', default: '' })
  chargeId: string;

  @AutoMap()
  @OneToMany(
    (type) => PurchaseProduct,
    (purchaseOrder) => purchaseOrder.purchase,
    { cascade: true },
  )
  orders: PurchaseProduct[];
}
