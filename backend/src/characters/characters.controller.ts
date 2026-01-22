import { Controller, Delete, Get, Param, Body, Post, Patch, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersService } from './characters.service';
import type { Multer } from 'multer';
import { ApiBody, ApiOperation, ApiParam, ApiTags, ApiOkResponse, ApiCreatedResponse,
            ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, 
                ApiInternalServerErrorResponse, 
                ApiConsumes} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CharacterWithImage } from './dto/character-with-image.dto';
import { CharacterResponseDto } from './dto/character-response.dto';
import { ImageUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterServ: CharactersService) {}

  // -----------------------------------------
  // GET ALL CHARACTERS
  // -----------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiOkResponse({ description: 'All characters returned successfully', type: CharacterResponseDto, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllCharacters() : Promise<CharacterResponseDto[]> {
    const characters = await this.characterServ.listAllCharacters();
    return characters.map(char => this.parseToResponseDto(char));
  }

  // -----------------------------------------
  // GET CHARACTER BY ID
  // -----------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the character', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'Character retrieved successfully', type: CharacterResponseDto })
  @ApiNotFoundResponse({ description: 'Character not found' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCharacter(@Param('id') id: string) : Promise<CharacterResponseDto | null> {
    return this.parseToResponseDto(await this.characterServ.getCharacter(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(`ADMIN`)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: 'Create a new character' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data to create a character',
    schema: {
      type: 'object',
      required: ['name', 'description', 'species'],
      properties: {
        name: { type: 'string', example: 'Pim Pimling' },
        description: { type: 'string', example: 'An eternally optimistic pink critter' },
        species: { type: 'string', example: 'Critter' },
        image: { type: 'string', format: 'binary', description: 'Character image file' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Character created successfully', type: CharacterResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createCharacter(
    @Body() dto: CreateCharacterDto,
    @UploadedFile() image?: Multer.File,
  ): Promise<CharacterResponseDto> {
    return this.parseToResponseDto(await this.characterServ.createCharacter(dto, image));
  }

  // -----------------------------------------
  // UPDATE CHARACTER
  // -----------------------------------------
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(`ADMIN`)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: 'Update an existing character' })
  @ApiParam({ name: 'id', description: 'UUID of the character to update', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Fields to update',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Pim Pimling' },
        description: { type: 'string', example: 'An eternally optimistic pink critter' },
        species: { type: 'string', example: 'Critter' },
        image: { type: 'string', format: 'binary', description: 'New character image file' },
      },
    },
  })
  @ApiOkResponse({ description: 'Character updated successfully', type: CharacterResponseDto })
  @ApiNotFoundResponse({ description: 'Character not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: UpdateCharacterDto,
    @UploadedFile() image?: Multer.File,
  ): Promise<CharacterResponseDto> {
    return this.parseToResponseDto(await this.characterServ.updateCharacter(id, dto, image));
  }

  // -----------------------------------------
  // DELETE CHARACTER
  // -----------------------------------------
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(`ADMIN`)
  @ApiOperation({ summary: 'Delete a character' })
  @ApiParam({ name: 'id', description: 'UUID of the character to delete', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiNoContentResponse({ description: 'Character deleted successfully' })
  @ApiNotFoundResponse({ description: 'Character not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  deleteCharacter(@Param('id') id: string) {
    return this.characterServ.deleteCharacter(id);
  }

  parseToResponseDto(character: CharacterWithImage) : CharacterResponseDto {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      species: character.species,
      imageUrl: character.image?.url
    };
  }
}
