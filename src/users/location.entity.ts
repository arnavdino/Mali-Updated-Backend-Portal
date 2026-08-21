import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity('location')
export class LocationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: string;

  @AutoMap()
  @Column({ name: 'circle' })
  circle: string;

  @AutoMap()
  //commune
  @Column({ name: 'common', nullable: true })
  common: string;

  @AutoMap()
  //village
  @Column({ name: 'village' })
  village: string;

  @AutoMap()
  //region
  @Column({ name: 'region', nullable: true })
  region: string;

  @AutoMap()
  @Column({ name: 'country' })
  country: string;
}
