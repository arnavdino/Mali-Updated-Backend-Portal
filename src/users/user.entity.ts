import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserSettings } from './user-settings.entity';
import { RoleEntity } from '../roles/role.entity';
import { LocationEntity } from './location.entity';

@Entity('user')
export class User {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'external_id', unique: true })
  externalId: string;

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
  @Column({ name: 'age', nullable: true })
  age: number;

  @AutoMap()
  @Column({ nullable: true })
  organization: string;

  @AutoMap()
  @Column({ name: 'email', unique: true })
  email: string;

  @AutoMap()
  @Column({ name: 'password', nullable: true, default: null })
  password: string;

  @AutoMap()
  @ManyToOne((type) => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @AutoMap()
  @Column({ name: 'reward_points', default: 0 })
  rewardPoints: number;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @Column({ name: 'image_url', nullable: true, default: null })
  imageUrl: string;

  @AutoMap()
  @Column({ name: 'verified', default: false })
  verified: boolean;

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

  @AutoMap()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'creator_id' })
  createdBy: User;

  @AutoMap()
  @Index()
  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;

  //   Main Crop
  @AutoMap()
  @Column({ name: 'main_crop' })
  mainCrop: string;
  // Secondary Crop
  @AutoMap()
  @Column({ name: 'secondary_crop', nullable: true })
  secondaryCrop: string;
  // Other Products

  @AutoMap()
  @Column({ name: 'other_products', nullable: true })
  otherProducts: string;
  // Other Income Generating Activities
  @AutoMap()
  @Column({ name: 'activities' })
  activities: string;
  // Live Stock farming
  @AutoMap()
  @Column({ name: 'live_stock_farming', nullable: true })
  liveStockFarming: string;
  // Small Trade
  @AutoMap()
  @Column({ name: 'small_trade', nullable: true })
  smallTrade: string;
  // Profession
  @AutoMap()
  @Column({ nullable: true })
  profession: string;
  // Means of Production
  @AutoMap()
  @Column({ name: 'means_of_production', nullable: true })
  meansOfProduction: string;
  // Means of Transport
  @AutoMap()
  @Column({ name: 'means_of_transport', nullable: true })
  meansOfTransport: string;
  // Financial Education
  @AutoMap()
  @Column({ name: 'financial_education', nullable: true })
  financialEducation: string;
  // Access to Credit
  @AutoMap()
  @Column({ name: 'access_to_credit', nullable: true })
  accessToCredit: string;
  // Access to Insurance
  @AutoMap()
  @Column({ name: 'access_to_insurance', nullable: true })
  accessToInsurance: string;
  // Aess to GAP
  @AutoMap()
  @Column({ name: 'access_to_gap', nullable: true })
  accessToGap: string;
  // "Total area;
  @AutoMap()
  @Column({ name: 'total_area', default: 0 })
  totalArea: number;
  // Total Used Area
  @AutoMap()
  @Column({ name: 'total_used_area', default: 0 })
  totalUsedArea: number;
  // Cultivated Area
  @AutoMap()
  @Column({ name: 'cultivated_area', default: 0 })
  cultivatedArea: number;
  // Actual area sown with sesame
  @AutoMap()
  @Column({ name: 'actual_area', default: 0 })
  actualArea: number;
  // Property Status
  @AutoMap()
  @Column({ name: 'property_status', nullable: true })
  propertyStatus: string;
  // Longtitude
  @AutoMap()
  @Column({ name: 'longitude', type: 'decimal' })
  longitude: number;
  // Latitude
  @AutoMap()
  @Column({ name: 'latitude', type: 'decimal' })
  latitude: number;
  // Forecasted Surface Area
  @AutoMap()
  @Column({ name: 'forcasted_surface_area', default: 0 })
  forecastedSurfaceArea: number;
  // Authorized Surface Area
  @AutoMap()
  @Column({ name: 'authorized_surface_area', default: 0 })
  authorizedSurfaceArea: number;

  @AutoMap()
  @Column({ name: 'literacy_level', nullable: true })
  literacyLevel: string;
}
