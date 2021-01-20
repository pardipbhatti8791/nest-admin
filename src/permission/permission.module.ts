import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './models/permission.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), CommonModule],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
