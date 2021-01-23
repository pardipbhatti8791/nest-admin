import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService extends AbstractService{
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {
    super(orderRepository);
  }

  async paginate(page = 1, relations= []): Promise<any> {
    const { data, meta } = await super.paginate(page, relations)
    return {
      data: data.map(order => ({
        id: order.id,
        name: order.name,
        email: order.email,
        created_at: order.created_at,
        total: order.total,
        order_items: order.order_items
      })),
      meta
    }
  }

  async chart() {
    return this.orderRepository.query(`
      SELECT DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date, sum(oi.price * oi.quantity) as sum From orders JOIN order_items oi on orders.id = oi.order_id GROUP BY date
    `);
  }
}
