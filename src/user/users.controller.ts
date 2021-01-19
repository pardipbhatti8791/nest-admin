import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Users Module')
@Controller('api/v1')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Get()
  all() {
    return this.userService.all()
  }


}
