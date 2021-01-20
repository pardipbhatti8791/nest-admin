import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService extends AbstractService{
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository)
  }

  async all(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async paginate(page = 1, relations= []): Promise<any> {
    const { data, meta } = await super.paginate(page, relations)
    return {
      data: data.map(user => {
        const { password, ...data } = user
        return data
      }),
      meta
    }
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
