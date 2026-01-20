import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CharacterResponseDto {
    @ApiProperty({
      description: "Unique identifier of the character",
      example: 'uuid-1234-5678-9012',
    })
    id: string;

    @ApiProperty({
      description: "Name of the character",
      example: 'Pim',
    })
    name: string;

    @ApiProperty({
      description: "Detailed description of the character",
      example: 'Pim is a cheerful and optimistic character known for his positive attitude',
    })
    description: string;
    
    @ApiProperty({
      description: "Species of the character",
      example: 'Critter',
    })
    species: string;

    @ApiPropertyOptional({
      description: "URL of the character image",
      example: 'https://example.com/images/pim.png',
      nullable: true,
    })
    imageUrl?: string;
}