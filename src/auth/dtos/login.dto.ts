import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';


export class LoginDto {

  @ApiProperty({ description: "Email required field" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: "Password is required field" })
  @IsString()
  password: string

}
