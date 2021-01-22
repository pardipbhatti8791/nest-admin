import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto{
  @ApiProperty({ description: "Title required field" })
  @IsString()
  title: string

  @ApiProperty({ description: "Description required field" })
  @IsString()
  description: string

  @ApiProperty({ description: "Image required field" })
  @IsString()
  image: string

  @ApiProperty({ description: "Price required field" })
  @IsNotEmpty()
  price: number
}
