import { AutoMap } from '@automapper/classes';
import { LocationDTO } from 'src/users/location.dto';
import { WarehouseDTO } from './warehouse.dto';

export class WarehouseManagerDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  fname: string;

  @AutoMap()
  lname: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  dob: string;

  @AutoMap()
  age: number;

  @AutoMap()
  schooled: boolean;

  @AutoMap()
  organization: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  gender: string;

  @AutoMap()
  nina: string;

  @AutoMap()
  warehouse: WarehouseDTO;

  @AutoMap()
  numOfChildren: number;

  @AutoMap()
  maritalStatus: string;

  @AutoMap()
  language: string;

  location: LocationDTO;

  @AutoMap()
  deleted: boolean;

  //   Literacy Level
  @AutoMap()
  literacyLevel: string;
  // Total Products
  @AutoMap()
  totalProducts: number;
  // Other Income Activites
  @AutoMap()
  otherIncomActivities: string;
  // Faciliation Activity
  @AutoMap()
  facilitationActivity: string;
  // Other Suppliers
  @AutoMap()
  otherSuppliers: string;
  @AutoMap()
  localOrganizations: number;
  @AutoMap()
  infrastructure: string;
  @AutoMap()
  logisticsAndProductionMeans: string;
  @AutoMap()
  surfaceAreaOfFarm: number;

  @AutoMap()
  status: string;
  @AutoMap()
  headquarters: string;
}
