import { AddressEntity } from '../entity/address.entity';

export class ReturnAddressDto {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  number: number;
  complement: string;

  constructor(addressEntity: AddressEntity) {
    this.country = addressEntity.country;
    this.state = addressEntity.state;
    this.city = addressEntity.city;
    this.street = addressEntity.street;
    this.zipCode = addressEntity.zipCode;
    this.number = addressEntity.number;
    this.complement = addressEntity.complement;
  }
}
