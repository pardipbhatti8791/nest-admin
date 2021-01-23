import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { Expose } from 'class-transformer';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => OrderItemEntity,
    orderItemEntity => orderItemEntity.order,
  )
  order_items: OrderItemEntity[];

  @Expose()
  get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @Expose()
  get total(): number {
    return this.order_items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  }
}
