import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';


export class SignupDto {
  @ApiProperty({ description: "First name is required field" })
  @IsString()
  firstName: string

  @ApiProperty({ description: "Last name is required field" })
  @IsString()
  lastName: string

  @ApiProperty({ description: "Email required field" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: "Password is required field" })
  @IsString()
  password: string

}
