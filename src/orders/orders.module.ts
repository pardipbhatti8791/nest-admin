import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
