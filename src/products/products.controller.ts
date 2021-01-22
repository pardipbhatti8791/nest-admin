import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dtos/product.dto';
import { PaginationDto } from '../user/dtos/pagination.dto';

@UseGuards(AuthGuard)
@ApiTags('Product Module')
@Controller('api/v1')
export class ProductsController {
  constructor(private productsService: ProductsService) {
  }

  @Get('get-products')
  async all(@Query() pageData: PaginationDto) {
    return this.productsService.paginate(pageData.page)
  }

  @Post('create-product')
  async create(@Body() body: ProductDto) {
    return this.productsService.create(body)
  }
}
