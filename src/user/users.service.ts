import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async all(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async create(data): Promise<User> {
    const hashed = await bcrypt.hash(data.password, 12)
    data.password = hashed
    return this.userRepository.save(data)
  }

  async findOne(data): Promise<User> {
    return await this.userRepository.findOne({email: data.email})
  }

  async findUserById(id): Promise<User> {
    return await this.userRepository.findOne({id: id})
  }
}
