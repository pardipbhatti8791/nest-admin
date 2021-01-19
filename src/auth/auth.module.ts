import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'guguilovu',
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController]
})
export class AuthModule {}
