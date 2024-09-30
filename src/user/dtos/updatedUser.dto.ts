import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  number_phone: string;

  @IsString()
  email: string;
}
