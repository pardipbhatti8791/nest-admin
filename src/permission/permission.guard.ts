import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { User } from '../user/models/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: UsersService,
    private jwtService: JwtService,
    private roleService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const access = this.reflector.get('access', context.getHandler());

    if (!access) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies['jwt'];

    try {
      const uData = await this.jwtService.verifyAsync(jwt);
      const user: User = await this.authService.findUserById(uData.id, ['role']);
      const role: Role = await this.roleService.findUserById(user.role.id, ['permissions'])
      if(!role.permissions.some(p => p.name === access)) {
        throw new UnauthorizedException("You are not authorized to initiate this action")
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return true;
  }
}
