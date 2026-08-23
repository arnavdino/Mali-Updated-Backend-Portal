import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Kit } from './kit.entity';

@Entity('kit_component')
export class KitComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Kit, (kit) => kit.components, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'kit_id' })
  kit: Kit;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'component_name' })
  componentName: string;

  @Column({ name: 'quantity_per_kit', type: 'decimal', precision: 12, scale: 3 })
  quantityPerKit: string;

  @Column()
  unit: string;

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number;
}
