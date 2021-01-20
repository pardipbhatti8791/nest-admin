import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RolesDto {
  @ApiProperty({ description: "name is required field" })
  @IsString()
  name: string

  @ApiProperty({ description: 'permission is required' })
  @IsArray()
  permission: number[]
}
