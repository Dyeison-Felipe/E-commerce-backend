import {
  Body,
  Controller,
  Get,
  Param,
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

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddress(): Promise<ReturnAddressDto[]> {
    const address = await this.addressService.getAllAddress();

    return address;
  }

  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressService.createAddress(
      createAddressDto,
      userId,
    );

    return address;
  }
}
