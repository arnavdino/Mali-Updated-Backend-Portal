import { AutoMap } from '@automapper/classes';
import { LocationEntity } from 'src/users/location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('warehouse')
export class Warehouse {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ name: 'legal_form' })
  legalForm: string;

  @AutoMap()
  @Column({ name: 'head_office' })
  headOffice: string;

  @AutoMap()
  @Column()
  capital: string;

  @AutoMap()
  @Column({ name: 'legal_rep' })
  legalRep: string;
  @AutoMap()
  @Column({ name: 'phone' })
  phone: string;

  @AutoMap()
  @Column({ name: 'receipt_number' })
  receiptNumber: string;

  @AutoMap()
  @Column()
  members: number;

  @OneToOne((type) => LocationEntity, { cascade: true })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @AutoMap()
  @Column({ name: 'villages_summary' })
  villagesSummary: number;

  @AutoMap()
  @Column({ name: 'members_summary' })
  membersSummary: number;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @AutoMap()
  @Column({ name: 'potentail_area_summary' })
  potentialAreaSummary: number;

  @AutoMap()
  @Column({ name: 'cultivated_area_summary' })
  cultivatedAreaSummary: number;

  @AutoMap()
  @Column({ name: 'forecast_campaign_areas_summary' })
  forecastCampaignAreasSummary: number;

  @AutoMap()
  @Column({ name: 'area_forecast_country_side_summary' })
  areaForecastCountrySideSummary: number;

  @AutoMap()
  @Column({ name: 'are_of_forecast_collective_fields' })
  areaOfForecastCollectiveFields: number;

  @AutoMap()
  @Column({ name: 'area_of_collective_fields_exploited' })
  areaOfCollectiveFieldsExploited: number;
  //     Total production = production Exploited Areas summary + production Areas Fields
  @AutoMap()
  @Column({ name: 'total_production' })
  totalProduction: number;
  // collectives exploited
  @AutoMap()
  @Column({ name: 'collectives_exploited' })
  collectivesExploited: number;

  // Storage warehouse: Capacity in tonnes &amp; status (owner, tenant)
  @AutoMap()
  @Column()
  storage: number;
  // Weighing Equipment: Type &amp; status (owner, tenant)
  @AutoMap()
  @Column({ name: 'weighing_equipment' })
  weighingEquipment: string;
  // Blowing Equipment: Type &amp; status (owner, tenant)
  @AutoMap()
  @Column({ name: 'blowing_equipment' })
  blowingEquipment: string;
  // Means of Transportation: Type &amp; status (owner, tenant)
  @AutoMap()
  @Column({ name: 'means_of_transportation' })
  meansOfTransportation: string;
  // Distance from centralization location (kilometer)
  @AutoMap()
  @Column({ name: 'distance_from_centralization_location' })
  distanceFromCentralizationLocation: number;
  // Distance from the Factory (kilometer)
  @AutoMap()
  @Column({ name: 'distance_from_factory' })
  distanceFromFactory: number;
  // Marketed production (kilogram)
  @AutoMap()
  @Column({ name: 'marketed_production' })
  marketedProduction: number;
  // Turnover (XOF)
  @AutoMap()
  @Column({ name: 'turn_over' })
  turnOver: number;
  // Fixed charge including taxes (XOF)
  @AutoMap()
  @Column({ name: 'fixed_charge_with_tax' })
  fixedChargeWithTax: number;
  // Net margin (XOF)
  @AutoMap()
  @Column({ name: 'net_margin' })
  netMargin: number;
  // Management of commitments / contractualization: formal, informal

  @AutoMap()
  @Column({ name: 'management_of_commitments' })
  managementOfCommitments: number;
  // Access to financing (XOF)
  @AutoMap()
  @Column({ name: 'access_to_financing' })
  accessToFinancing: number;
  // Other products: fonio, corn, millet, sorghum, hibiscus, rice, beans, soy: Summary

  @AutoMap()
  @Column({ name: 'other_products', type: 'text' })
  otherProducts: string;
  // Other AGR: market gardening, goat, cattle, sheep breeding, poultry farming, fish farming, harvested products:
  @AutoMap()
  @Column({ name: 'other_agr', type: 'text' })
  otherAgr: string;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
