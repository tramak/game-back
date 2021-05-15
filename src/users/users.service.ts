import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UsersEntity> {
    const user = await this.usersRepository.save(dto);
    return user;
  }

  async getAllUser(): Promise<Array<UsersEntity>> {
    const users = await this.usersRepository.find();
    return users;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
