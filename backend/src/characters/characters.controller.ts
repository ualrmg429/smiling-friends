import { Controller, Delete, Get, Param, Body, Post, Put, Patch } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';


@Controller('characters')
export class CharactersController {
    
    @Get('/')
    getAllCharacters() {
        return 'Return all characters';
    }

    @Get(':id')
    getCharacter(@Param('id') id : String) {
        return 'Hi, Charlie';
    }

    @Post()
    createCharacter(@Body() dto: CreateCharacterDto) {
        return 'Creating character';
    }

    @Patch(':id')
    updateCharacter(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
        return 'Updated character'
    }

    @Delete()
    deleteCharacter(id: String) {
        return 'Deleting character';
    }
}
