import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Permission Module')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('api/v1')
export class PermissionController {
  constructor(private permissionService: PermissionService) {
  }

  @Get('permissions')
  async all(): Promise<any> {
    return this.permissionService.all()
  }
}
