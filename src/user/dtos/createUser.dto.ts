import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  number_phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
