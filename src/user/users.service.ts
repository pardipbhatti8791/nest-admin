import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async paginates(page = 1, relations = []): Promise<any> {
    const { data, meta } = await super.paginate(page, relations);
    return {
      data: data.map(user => {
        const { password, ...data } = user;
        return data;
      }),
      meta,
    };
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(data, relations = []): Promise<User> {
    return await this.userRepository.findOne(
      { email: data.email },
      { relations },
    );
  }

  async findUserById(id, relations = []): Promise<User> {
    return await this.userRepository.findOne({ id: id }, { relations });
  }
}
