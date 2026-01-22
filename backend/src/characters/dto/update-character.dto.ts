import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCharacterDto {
  @ApiPropertyOptional({ 
    description: 'Name of the character', 
    maxLength: 50, 
    example: 'Charlie' 
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ 
    description: 'Short description of the character', 
    maxLength: 50, 
    example: 'Main smiling friend of the show' 
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Species of the character', 
    maxLength: 50, 
    example: 'Human' 
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  species?: string;
}
