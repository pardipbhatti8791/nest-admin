import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AuthController]
})
export class AuthModule {}
