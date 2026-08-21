import { AutoMap } from '@automapper/classes';
import { CreditCardDTO } from './card.dto';
import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';
import { LocationDTO } from './location.dto';
import { RoleDto } from 'src/roles/role.dto';

export class UserDTO {
  @AutoMap()
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

  role: RoleDto;

  @AutoMap()
  rewardPoints: number;

  @AutoMap()
  @IsString()
  password: string;

  @ValidateIf((object) => {
    return !(
      object?.password?.length > 7 &&
      hasSpecial(object?.password) &&
      hasUpper(object?.password) &&
      hasLower(object?.password) &&
      hasNumber(object?.password)
    );
  })
  @IsString({ message: 'password must be valid' })
  nonexisting: string;

  cards: CreditCardDTO[];

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  allowPush: boolean;

  @AutoMap()
  phone: string;

  @AutoMap()
  dob: string;

  status: string;

  @AutoMap()
  location: LocationDTO;
  @AutoMap()
  nina: string;

  @AutoMap()
  language: string;

  @AutoMap()
  externalId: string;
  @AutoMap()
  gender: string;

  @AutoMap()
  age: number;

  @AutoMap()
  organization: string;

  @AutoMap()
  mainCrop: string;
  // Secondary Crop
  @AutoMap()
  secondaryCrop: string;
  // Other Products

  @AutoMap()
  otherProducts: string;
  // Other Income Generating Activities
  @AutoMap()
  activities: string;
  // Live Stock farming
  @AutoMap()
  liveStockFarming: string;
  // Small Trade
  @AutoMap()
  smallTrade: string;
  // Profession
  @AutoMap()
  profession: string;
  // Means of Production
  @AutoMap()
  meansOfProduction: string;
  // Means of Transport
  @AutoMap()
  meansOfTransport: string;
  // Financial Education
  @AutoMap()
  financialEducation: string;
  // Access to Credit
  @AutoMap()
  accessToCredit: string;
  // Access to Insurance
  @AutoMap()
  accessToInsurance: string;
  // Aess to GAP
  @AutoMap()
  accessToGap: string;
  // "Total area;
  @AutoMap()
  totalArea: number;
  // Total Used Area
  @AutoMap()
  totalUsedArea: number;
  // Cultivated Area
  @AutoMap()
  cultivatedArea: number;
  // Actual area sown with sesame
  @AutoMap()
  actualArea: number;
  // Property Status
  @AutoMap()
  propertyStatus: string;
  // Longtitude
  @AutoMap()
  longitude: number;
  // Latitude
  @AutoMap()
  latitude: number;
  // Forecasted Surface Area
  @AutoMap()
  forecastedSurfaceArea: number;
  // Authorized Surface Area
  @AutoMap()
  authorizedSurfaceArea: number;

  @AutoMap()
  literacyLevel: string;

  @AutoMap()
  numOfChildren: number;

  @AutoMap()
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
