import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const jwt = request.cookies['jwt']

    try {
      if(!this.jwtService.verify(jwt)) {
        throw new UnauthorizedException("You are not authorized")
      }
      return true
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }
  }
}
