import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updatedUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getAllUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User id ${userId} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: 1,
    });

    const saveUser = await this.userRepository.save(newUser);

    return saveUser;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`user id ${userId} not found`);
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`user id ${userId} not found`);
    }

    return this.userRepository.delete(userId);
  }
}
