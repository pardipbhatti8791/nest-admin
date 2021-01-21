import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService extends AbstractService{
  constructor(@InjectRepository(ProductEntity) private readonly  productRepository: Repository<ProductEntity>) {
    super(productRepository);
  }
}
