import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  Post,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../user/dtos/pagination.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@ApiTags('Orders Module')
@Controller('api/v1')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('orders')
  async all(@Query() pageData: PaginationDto) {
    return this.ordersService.paginate(pageData.page, ['order_items']);
  }

  @Post('export')
  async export(@Res() res: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.ordersService.all(['order_items']);
    const json = [];
    orders.forEach((o: OrderEntity) => {
      json.push({
        ID: o.id,
        Name: o.name,
        Email: o.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      o.order_items.forEach((i: OrderItemEntity) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': i.product_title,
          Price: i.price,
          Quantity: i.quantity,
        });
      });

      const csv = parser.parse(json);

      res.header('Content-Type', 'text/csv');
      res.attachment('orders.csv');
      return res.send(csv);
    });
  }

  @Get('chart')
  async chart() {
    return this.ordersService.chart()
  }
}
