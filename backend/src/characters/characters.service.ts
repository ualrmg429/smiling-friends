import { Injectable, NotFoundException } from '@nestjs/common';
import { CharactersRepository } from './characters.repository';
import { CreateCharacterData, UpdateCharacterData } from './interfaces/characters.interface';
import { CreateCharacterDto } from './dto/create-character.dto';

@Injectable()
export class CharactersService {
    constructor(private characterRepo: CharactersRepository) {}

    /**
     * Lists all characters.
     * @returns The list of characters.
     */
    async listAllCharacters() {
        const characters = await this.characterRepo.getAll();

        if(characters.length === 0) {
            throw new NotFoundException('There are any characters');
        }

        return characters;
    }

    /**
     * Get a character by id.
     * 
     * @param id Identifier of the character.
     * @returns The character.
     */
    async getCharacter(id: string) {
        const character = await this.characterRepo.findById(id);
        
        if(!character) {
            throw new NotFoundException('There is not any character with the id:' + id);
        }

        return character;
    }

    /**
     * Create a character.
     * 
     * @param data The data of the character. 
     * @returns The created character.
     */
    async createCharacter(data: CreateCharacterData) {
        return await this.characterRepo.create(data);
    }

    /**
     * Update a character
     * 
     * @param id Identifier of the character 
     * @param data The information to update
     * @returns The updated character
     */
    async updateCharacter(id: string, data: UpdateCharacterData) {
        const character = await this.characterRepo.findById(id);
        
        if(!character) {
            throw new NotFoundException('There is not any character with the id:' + id);
        }

        return await this.characterRepo.update(id, data);
    }

    /**
     * Delete a character
     * 
     * @param id Identifier of the character
     * @returns 
     */
    async deleteCharacter(id: string) {
        const character = await this.characterRepo.findById(id);
        
        if(!character) {
            throw new NotFoundException('There is not any character with the id:' + id);
        }

        await this.characterRepo.delete(id);
    }


}
