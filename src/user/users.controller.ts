import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './models/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from './dtos/pagination.dto';
import { UserDto } from './dtos/user.dto';
import { HasPermission } from '../permission/has-permission.decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');


@ApiTags('Users Module')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('api/v1')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Get('users/all')
  @HasPermission("edit_users")
  all(@Query() data: PaginationDto) {
    const { page } = data
    return this.userService.paginates(page, ['role'])
  }

  @Post('auth/signup')
  async create(@Body() user: UserDto): Promise<User> {

    const { role_id, password, ...data } = user

    const hashed = await bcrypt.hash(password, 12)

    return this.userService.create({
      ...data,
      password: hashed,
      role: {
        id: role_id
      }
    })
  }

}
