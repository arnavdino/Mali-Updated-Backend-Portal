import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class EditUserDTO {
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
  phone: string;

  @AutoMap()
  dob: string;
}
