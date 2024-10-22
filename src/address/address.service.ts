import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { Repository } from 'typeorm';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
  ) {}

  async getAllAddress(): Promise<ReturnAddressDto[]> {
    return await this.addressRepository.find();
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const user = await this.userService.getAllUserById(userId);

    if (!user) {
      throw new NotFoundException(`user id ${userId} not found`);
    }

    const newAddress = this.addressRepository.create({
      ...createAddressDto,
      user: { id: user.id },
    });

    const saveAddress = this.addressRepository.save(newAddress);

    return saveAddress;
  }
}
