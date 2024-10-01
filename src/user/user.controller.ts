import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updatedUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:userId')
  async getAllUserById(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.getAllUserById(userId);
    return new ReturnUserDto(user);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUserDto);

    return new ReturnUserDto(user);
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.updateUser(userId, updateUserDto);

    return new ReturnUserDto(user);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
