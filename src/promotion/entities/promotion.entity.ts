import { AutoMap } from '@automapper/classes';
import { Product, ProductStatus } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('promotion')
export class Promotion {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'name' })
  name: string;

  @AutoMap()
  @Column({ name: 'description' })
  description: string;

  @AutoMap()
  @Column({ name: 'is_first_page', default: false })
  isFirstPage: boolean;

  @AutoMap()
  @Column({ name: 'image_url' })
  imageUrl: string;

  @AutoMap()
  @Column({ name: 'action' })
  action: string;
  
  @AutoMap()
  @Column({ name: 'discount' })
  discount: number;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @AutoMap()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @AutoMap()
  @Column({ name: 'status', default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @AutoMap()
  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
