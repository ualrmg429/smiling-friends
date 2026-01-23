import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class ConfirmPasswordResetDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: '6-digit verification code' })
  @IsString()
  @Length(6, 6)
  code: string;

  @ApiProperty({ example: 'newPassword123', description: 'New password', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;
}