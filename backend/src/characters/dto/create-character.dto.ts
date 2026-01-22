import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({
    description: "Character's name",
    maxLength: 50,
    example: 'Charlie',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: "Short description of the character",
    maxLength: 1000,
    example: 'One of the main smiling friends of the show',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description: string;

  @ApiProperty({
    description: "Species of the character",
    maxLength: 50,
    example: 'Critter',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  species: string;
}
