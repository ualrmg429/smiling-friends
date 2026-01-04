import { Controller, Delete, Get, Param, Body, Post, Put, Patch } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharactersService } from './characters.service';


@Controller('characters')
export class CharactersController {
    constructor(private characterServ : CharactersService) {}
    
    @Get('/')
    getAllCharacters() {
        return this.characterServ.listAllCharacters(); 
    }

    @Get(':id')
    getCharacter(@Param('id') id : string) {
        return this.characterServ.getCharacter(id);
    }

    @Post()
    createCharacter(@Body() dto: CreateCharacterDto) {
        return this.characterServ.createCharacter(dto);
    }

    @Patch(':id')
    updateCharacter(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
        return this.characterServ.updateCharacter(id, dto);
    }

    @Delete(':id')
    deleteCharacter(@Param('id') id: string) {
        return this.characterServ.deleteCharacter(id);
    }
}
