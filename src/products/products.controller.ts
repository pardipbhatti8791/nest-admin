import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Roles Module')
@Controller('api/v1')
export class ProductsController {
  constructor(private productsService: ProductsService) {
  }

  @Get()
  async all(@Query('page') page = 1) {
    return this.productsService.paginate(page)
  }

  @Post('createProduct')
  async create(@Body() body) {

  }
}
