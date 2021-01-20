import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return await this.repository.find({ relations });
  }

  async paginate(
    page = 1,
    relations= []
  ): Promise<{
    data: any[];
    meta: { total: number; page: number; last_page: number };
  }> {
    const take = 1;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<any> {
    const hashed = await bcrypt.hash(data.password, 12);
    data.password = hashed;
    return this.repository.save(data);
  }

  async findOne(data, relations = []): Promise<any> {
    return await this.repository.findOne({ email: data.email }, { relations });
  }

  async findUserById(id): Promise<any> {
    return await this.repository.findOne({ id: id });
  }
}
