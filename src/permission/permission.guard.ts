import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';

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
      console.log(uData.id);
      const user = await this.authService.findUserById(uData.id, ['role']);
      console.log(user);
      const role = await this.roleService.findOne({ id: user.role.id }, ['permissions'])
      console.log(role)
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return true;
  }
}
