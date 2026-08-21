import { AutoMap } from '@automapper/classes';
import { LocationDTO } from 'src/users/location.dto';

export class WarehouseDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  legalForm: string;

  @AutoMap()
  headOffice: string;

  @AutoMap()
  capital: string;

  @AutoMap()
  legalRep: string;
  @AutoMap()
  phone: string;

  @AutoMap()
  receiptNumber: string;

  @AutoMap()
  members: number;

  @AutoMap()
  location: LocationDTO;

  @AutoMap()
  villagesSummary: number;

  @AutoMap()
  membersSummary: number;

  @AutoMap()
  potentialAreaSummary: number;

  @AutoMap()
  cultivatedAreaSummary: number;

  @AutoMap()
  forecastCampaignAreasSummary: number;

  @AutoMap()
  areaForecastCountrySideSummary: number;

  @AutoMap()
  areaOfForecastCollectiveFields: number;

  @AutoMap()
  areaOfCollectiveFieldsExploited: number;
  @AutoMap()
  totalProduction: number;
  @AutoMap()
  collectivesExploited: number;

  @AutoMap()
  storage: number;
  @AutoMap()
  weighingEquipment: string;
  @AutoMap()
  blowingEquipment: string;
  @AutoMap()
  meansOfTransportation: string;
  @AutoMap()
  distanceFromCentralizationLocation: number;
  @AutoMap()
  distanceFromFactory: number;
  @AutoMap()
  marketedProduction: number;
  @AutoMap()
  turnOver: number;
  @AutoMap()
  fixedChargeWithTax: number;
  @AutoMap()
  netMargin: number;

  @AutoMap()
  managementOfCommitments: number;
  @AutoMap()
  accessToFinancing: number;

  @AutoMap()
  otherProducts: string;
  @AutoMap()
  otherAgr: string;
}
