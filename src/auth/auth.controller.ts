import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  Get,
  Req,
  UnauthorizedException, UseInterceptors, ClassSerializerInterceptor, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from '../user/users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@ApiCookieAuth()
@ApiTags('Auth Module')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: SignupDto) {
    return this.userService.create(user);
  }

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<Object> {
    const user = await this.userService.findOne(data);
    if (!user) {
      throw new NotFoundException('Invalid email/password');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new NotFoundException('Invalid email/password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return { token: jwt };
  }


  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    return await this.jwtService
      .verifyAsync(cookie)
      .then(async resp => {

          const user =  await this.userService.findUserById(resp.id)
          if(!user) {
            throw new NotFoundException(`User not found with #${resp.id}`)
          }

          return user
      })
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return {
      message: 'Success'
    }
  }
}
