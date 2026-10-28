import { AutoMap } from '@automapper/classes';
import { CreditCardDTO } from './card.dto';
import { Allow, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { LocationDTO } from './location.dto';
import { RoleDto } from 'src/roles/role.dto';

export class UserDTO {
  @AutoMap()
  @Allow()
  id: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  fname: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  lname: string;

  @AutoMap()
  @IsString()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    {
      message: 'email must be of valid email address',
    },
  )
  email: string;

  @Allow()
  role: RoleDto;

  @AutoMap()
  @Allow()
  rewardPoints: number;

  @AutoMap()
  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@$!#%&()^~{}\-_]).{8,}$/, {
    message: 'password must be valid',
  })
  password?: string;

  @Allow()
  cards: CreditCardDTO[];

  @AutoMap()
  @Allow()
  imageUrl: string;

  @AutoMap()
  @Allow()
  allowPush: boolean;

  @AutoMap()
  @Allow()
  phone: string;

  @AutoMap()
  @Allow()
  dob: string;

  @Allow()
  status: string;

  @AutoMap()
  @Allow()
  location: LocationDTO;
  @AutoMap()
  @Allow()
  nina: string;

  @AutoMap()
  @Allow()
  language: string;

  @AutoMap()
  @Allow()
  externalId: string;
  @AutoMap()
  @Allow()
  gender: string;

  @AutoMap()
  @Allow()
  age: number;

  @AutoMap()
  @Allow()
  organization: string;

  @AutoMap()
  @Allow()
  mainCrop: string;
  // Secondary Crop
  @AutoMap()
  @Allow()
  secondaryCrop: string;
  // Other Products

  @AutoMap()
  @Allow()
  otherProducts: string;
  // Other Income Generating Activities
  @AutoMap()
  @Allow()
  activities: string;
  // Live Stock farming
  @AutoMap()
  @Allow()
  liveStockFarming: string;
  // Small Trade
  @AutoMap()
  @Allow()
  smallTrade: string;
  // Profession
  @AutoMap()
  @Allow()
  profession: string;
  // Means of Production
  @AutoMap()
  @Allow()
  meansOfProduction: string;
  // Means of Transport
  @AutoMap()
  @Allow()
  meansOfTransport: string;
  // Financial Education
  @AutoMap()
  @Allow()
  financialEducation: string;
  // Access to Credit
  @AutoMap()
  @Allow()
  accessToCredit: string;
  // Access to Insurance
  @AutoMap()
  @Allow()
  accessToInsurance: string;
  // Aess to GAP
  @AutoMap()
  @Allow()
  accessToGap: string;
  // "Total area;
  @AutoMap()
  @Allow()
  totalArea: number;
  // Total Used Area
  @AutoMap()
  @Allow()
  totalUsedArea: number;
  // Cultivated Area
  @AutoMap()
  @Allow()
  cultivatedArea: number;
  // Actual area sown with sesame
  @AutoMap()
  @Allow()
  actualArea: number;
  // Property Status
  @AutoMap()
  @Allow()
  propertyStatus: string;
  // Longtitude
  @AutoMap()
  @Allow()
  longitude: number;
  // Latitude
  @AutoMap()
  @Allow()
  latitude: number;
  // Forecasted Surface Area
  @AutoMap()
  @Allow()
  forecastedSurfaceArea: number;
  // Authorized Surface Area
  @AutoMap()
  @Allow()
  authorizedSurfaceArea: number;

  @AutoMap()
  @Allow()
  literacyLevel: string;

  @AutoMap()
  @Allow()
  numOfChildren: number;

  @AutoMap()
  @Allow()
  maritalStatus: string;
}
export function hasSpecial(pass: string) {
  return /[*@$!#%&()^~{}\-_]+/.test(pass);
}
export function hasUpper(pass: string) {
  return /[A-Z]+/.test(pass);
}
export function hasLower(pass: string) {
  return /[a-z]+/.test(pass);
}
export function hasNumber(pass: string) {
  return /[0-9]+/.test(pass);
}
