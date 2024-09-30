import { IsString } from 'class-validator';

export class ReturnUserDto {
  @IsString()
  name: string;

  @IsString()
  number_phone: string;

  @IsString()
  email: string;
}
