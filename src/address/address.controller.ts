import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { AddressEntity } from './entity/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserType } from 'src/user/enum/typeUser.enum';
import { Roles } from 'src/decorators/role.decorator';
import { UserId } from 'src/decorators/userId.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddress(): Promise<ReturnAddressDto[]> {
    const address = await this.addressService.getAllAddress();

    return address;
  }

  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @UserId() userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    console.log('🚀 ~ AddressController ~ userId:', userId);
    const address = await this.addressService.createAddress(
      createAddressDto,
      userId,
    );

    return address;
  }
}
