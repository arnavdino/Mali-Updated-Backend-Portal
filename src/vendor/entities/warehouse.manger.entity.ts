import { AutoMap } from '@automapper/classes';
import { LocationEntity } from 'src/users/location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';

@Entity('warehouse_manager')
export class WarehouseManager {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'fname' })
  fname: string;

  @AutoMap()
  @Column({ name: 'lname' })
  lname: string;

  @AutoMap()
  @Column({ name: 'phone' })
  phone: string;

  @AutoMap()
  @Column({ name: 'dob' })
  dob: string;

  @AutoMap()
  @Column({ name: 'age', default: 0 })
  age: number;

  @AutoMap()
  @Column({ name: 'schooled', default: false })
  schooled: boolean;

  @AutoMap()
  @Column({ name: 'organization', nullable: true })
  organization: number;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @Column({ name: 'gender', nullable: true })
  gender: string;

  @AutoMap()
  @Column({ name: 'nina', nullable: true })
  nina: string;

  @AutoMap()
  @Column({ name: 'num_of_children', default: 0 })
  numOfChildren: number;

  @AutoMap()
  @Column({ name: 'marital_status', default: '' })
  maritalStatus: string;

  @AutoMap()
  @Column({ name: 'language', default: 'en' })
  language: string;

  @OneToOne((type) => LocationEntity, { cascade: true })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  //   Literacy Level
  @AutoMap()
  @Column({ name: 'literacy_level' })
  literacyLevel: string;
  // Total Products
  @AutoMap()
  @Column({ name: 'total_products' })
  totalProducts: number;
  // Other Income Activites
  @AutoMap()
  @Column({ name: 'other_income_activities', type: 'text' })
  otherIncomActivities: string;
  // Faciliation Activity
  @AutoMap()
  @Column({ name: 'facilitation_activity', type: 'text' })
  facilitationActivity: string;
  // Other Suppliers
  @AutoMap()
  @Column({ name: 'other_suppliers', type: 'text' })
  otherSuppliers: string;
  // Number of local organizations and PMEAs
  @AutoMap()
  @Column({ name: 'local_organizations' })
  localOrganizations: number;
  // Infrastructure
  @AutoMap()
  @Column({ type: 'text' })
  infrastructure: string;
  // Logistics and production means
  @AutoMap()
  @Column({ name: 'logistics_and_production_means', type: 'text' })
  logisticsAndProductionMeans: string;
  // Surface Area of farm
  @AutoMap()
  @Column({ name: 'surface_area_of_farm' })
  surfaceAreaOfFarm: number;
  // Status

  @AutoMap()
  @Column()
  status: string;

  @AutoMap()
  @Column()
  headquarters: string;

  @AutoMap()
  @ManyToOne((type) => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
}
