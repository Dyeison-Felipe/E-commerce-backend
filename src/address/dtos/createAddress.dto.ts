import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  zipCode: string;

  @IsNumber()
  number: number;

  @IsString()
  complement: string;
}
