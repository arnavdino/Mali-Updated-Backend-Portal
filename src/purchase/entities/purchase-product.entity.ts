import { AutoMap } from '@automapper/classes';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase, PurchaseState } from './purchase.entity';

@Entity('purchase_product')
export class PurchaseProduct {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne((type) => Purchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @AutoMap()
  @Column()
  quantity: number;

  @AutoMap()
  @Column({ name: 'total', type: 'float' })
  total: number;

  @AutoMap()
  @Column({ name: 'state' })
  state: PurchaseState;

  @AutoMap()
  @Column({ name: 'taxes', type: 'float' })
  taxes: number;

  @AutoMap()
  @Column({ name: 'notes', type: 'text',nullable:true })
  notes: string;
}
