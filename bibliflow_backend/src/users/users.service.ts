import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
