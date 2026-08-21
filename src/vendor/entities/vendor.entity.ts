import { AutoMap } from '@automapper/classes';
import { Product, ProductStatus } from 'src/product/entities/product.entity';
import { LocationEntity } from 'src/users/location.entity';
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
import { Warehouse } from './warehouse.entity';

@Entity('vendor')
export class Vendor {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'name' })
  name: string;

  @AutoMap()
  @Column({ name: 'manager_name' })
  managerName: string;

  @AutoMap()
  @OneToMany((type) => Product, (pr) => pr.vendor)
  products: Product[];

  @AutoMap()
  @Column({ name: 'organization', nullable: true })
  organization: string;
  @AutoMap()
  @Column({ name: 'method_of_payment', nullable: true })
  methodOfPayment: string;
  @AutoMap()
  @Column({ name: 'method_of_delivery', nullable: true })
  methodOfDelivery: string;
  @AutoMap()
  @Column({ name: 'method_of_supply', nullable: true })
  methodOfSupply: string;
  @AutoMap()
  @Column({ name: 'phone' })
  phone: string;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @Column({ name: 'status', default: 'inactive' })
  status: ProductStatus;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  //   Transport contract
  @AutoMap()
  @Column({ name: 'transport_contract', nullable: true })
  transportContract: string;
  // Basic services to producers
  @AutoMap()
  @Column({ name: 'basic_services', nullable: true })
  baseServices: string;
  // Seeds (Varieties)
  @AutoMap()
  @Column({ name: 'seeds', nullable: true })
  seeds: string;
  // Fertilizer (Type)
  @AutoMap()
  @Column({ name: 'fertilizer', nullable: true })
  fertilizer: string;
  // Herbicide (Type)
  @AutoMap()
  @Column({ name: 'herbicide', nullable: true })
  herbicide: string;
  // Phytosanitary product (type)
  @AutoMap()
  @Column({ name: 'phystosanitary_product', nullable: true })
  phytosanitaryProduct: string;
  // Plowing
  @AutoMap()
  @Column({ name: 'plowing', nullable: true })
  plowing: string;
  // Semi
  @AutoMap()
  @Column({ name: 'semi', nullable: true })
  semi: string;
  // Fertilizer spreading
  @AutoMap()
  @Column({ name: 'fertilizer_spreading', nullable: true })
  fertilizerSpreading: string;
  // Phyto treatment
  @AutoMap()
  @Column({ name: 'phyto_treatment', nullable: true })
  phytoTreatment: string;
  // Small equipment (types)
  @AutoMap()
  @Column({ name: 'small_equipment', nullable: true })
  smallEquipment: string;
  // Insurance (types)
  @AutoMap()
  @Column({ name: 'insurance', nullable: true })
  insurance: string;

  @AutoMap()
  @OneToOne((type) => LocationEntity, { cascade: true })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @AutoMap()
  @ManyToOne((type) => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @AutoMap()
  @Column({ name: 'product_supplied', nullable: true })
  productSupplied: string;
  @AutoMap()
  @Column({ name: 'product_purchased', nullable: true })
  productPurchased: string;
}
