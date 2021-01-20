import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './models/permission.entity';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class PermissionService extends AbstractService{
  constructor(@InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>) {
    super(permissionRepository)
  }
}
