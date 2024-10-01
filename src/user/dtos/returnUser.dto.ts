import { UserEntity } from '../entity/user.entity';

export class ReturnUserDto {
  name: string;
  number_phone: string;
  email: string;
  password: string;
  role: number;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.number_phone = userEntity.number_phone;
    this.password = userEntity.password;
    this.role = userEntity.role;
  }
}
