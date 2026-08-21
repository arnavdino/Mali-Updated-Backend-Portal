import { AutoMap } from '@automapper/classes';
import { User } from 'src/users/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

export enum Presentation {
  NONE = 'none',
  FEATURED = 'featured',
  MAIN_PAGE = 'main',
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum Level {
  CATEGORY = 'category',
  PRODUCT = 'product',
  SUB_CATEGORY = 'sub_category',
}

@Entity('product')
@Unique('product_name_per_type', ['name', 'type'])
export class Product {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'name' })
  name: string;

  @ManyToOne((type) => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @AutoMap()
  @Column({ name: 'price', default: 0.0, type: 'float' })
  price: string;

  @AutoMap()
  @Column({ name: 'reward_ratio', default: 0.0, type: 'float' })
  rewardRatio: number;

  @AutoMap()
  @Column({ name: 'unit' })
  unit: string;

  @AutoMap()
  @Column({ name: 'description' })
  description: string;

  @AutoMap()
  @Column({ name: 'long_description', type: 'text', default: null })
  longDescription: string;

  @AutoMap()
  @Column({ name: 'status', default: 'published' })
  status: string;

  @AutoMap()
  @Column({ name: 'type', default: 'product' })
  type: string;

  @AutoMap()
  @Column({ name: 'presentation', default: Presentation.NONE })
  presentation: Presentation;

  @AutoMap()
  @Column({ name: 'num_avail' })
  numAvail: number;

  @AutoMap()
  @Column({ name: 'num_left' })
  numLeft: number;

  @AutoMap()
  @Column({ name: 'image_url' })
  imageUrl: string;

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
  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @AutoMap()
  @Column({ name: 'sections', type: 'json', default: null })
  sections: { [key: string]: string[] };

  @AutoMap()
  @Column({ name: 'level', default: Level.PRODUCT })
  @Index()
  level: Level;
}
