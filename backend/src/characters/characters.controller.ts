import { Controller, Get } from '@nestjs/common';

@Controller('characters')
export class CharactersController {
    
    @Get('/')
    getAllCharacters() {
        return 'Return all characters';
    }

    @Get()
    getCharacter(id: String) {
        return 'Hi, Charlie';
    }
}
