import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: "page is required field" })
  @IsNumber()
  page: number
}
