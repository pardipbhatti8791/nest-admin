import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class UserDto {
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

  @ApiProperty({ description: "Role ID is required field" })
  @IsNotEmpty()
  role_id: number
}
