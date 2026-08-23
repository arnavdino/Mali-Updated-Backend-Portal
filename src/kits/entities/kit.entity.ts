import { Product } from 'src/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { KitComponent } from './kit-component.entity';

@Entity('kit')
export class Kit {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  reference: string;

  @Column()
  campaign: string;

  @Column()
  scenario: string;

  @Column()
  crop: string;

  @Column({ name: 'coverage_hectares', type: 'decimal', precision: 10, scale: 2 })
  coverageHectares: string;

  @Column({ name: 'unit_advance_fcfa', type: 'decimal', precision: 15, scale: 0, default: 0 })
  unitAdvanceFcfa: string;

  @Column({ name: 'repayment_quantity', type: 'decimal', precision: 12, scale: 3, default: 0 })
  repaymentQuantity: string;

  @Column({ name: 'repayment_unit', default: 'kg' })
  repaymentUnit: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => KitComponent, (component) => component.kit)
  components: KitComponent[];
}
