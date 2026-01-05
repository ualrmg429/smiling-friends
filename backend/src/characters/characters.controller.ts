import { Controller, Delete, Get, Param, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersService } from './characters.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags, ApiOkResponse, ApiCreatedResponse,
            ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, 
                ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Character } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterServ: CharactersService) {}

  // -----------------------------------------
  // GET ALL CHARACTERS
  // -----------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiOkResponse({ description: 'All characters returned successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getAllCharacters() : Promise<Character[] | null> {
    return this.characterServ.listAllCharacters();
  }

  // -----------------------------------------
  // GET CHARACTER BY ID
  // -----------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the character', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'Character retrieved successfully', type: CreateCharacterDto })
  @ApiNotFoundResponse({ description: 'Character not found' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getCharacter(@Param('id') id: string) : Promise<Character | null> {
    return this.characterServ.getCharacter(id);
  }

  // -----------------------------------------
  // CREATE CHARACTER
  // -----------------------------------------
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(`ADMIN`)
  @ApiOperation({ summary: 'Create a new character' })
  @ApiBody({ type: CreateCharacterDto, description: 'Data to create a character' })
  @ApiCreatedResponse({ description: 'Character created successfully', type: CreateCharacterDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  createCharacter(@Body() dto: CreateCharacterDto) : Promise<Character> {
    return this.characterServ.createCharacter(dto);
  }

  // -----------------------------------------
  // UPDATE CHARACTER
  // -----------------------------------------
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(`ADMIN`)
  @ApiOperation({ summary: 'Update an existing character' })
  @ApiParam({ name: 'id', description: 'UUID of the character to update', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateCharacterDto, description: 'Fields to update' })
  @ApiOkResponse({ description: 'Character updated successfully', type: UpdateCharacterDto })
  @ApiNotFoundResponse({ description: 'Character not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  updateCharacter(@Param('id') id: string, @Body() dto: UpdateCharacterDto) 
    : Promise<Character> {
    return this.characterServ.updateCharacter(id, dto);
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
}
