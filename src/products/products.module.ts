import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './models/product.entity';
import { CommonModule } from '../common/common.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CommonModule],
  controllers: [ProductsController, UploadController],
  providers: [ProductsService],
})
export class ProductsModule {}
