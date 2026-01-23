import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: 'Código enviado a tu correo', description: 'Response message' })
  message: string;
}