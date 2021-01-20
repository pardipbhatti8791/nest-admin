import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dtos/roles.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles Module')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {
  }

  @Post('createRolePermissions')
  create(@Body() data: RolesDto) {
    return this.rolesService.create({
      name: data.name,
      permissions: data.permission.map(id => ({id}))
    })
  }

  @Get('roles')
  roles() {
    return this.rolesService.all(['permissions'] )
  }
}
