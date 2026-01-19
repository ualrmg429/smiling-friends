import { Injectable, NotFoundException } from '@nestjs/common';
import { CharactersRepository } from './characters.repository';
import { CreateCharacterData, UpdateCharacterData } from './interfaces/characters.interface';
import { Character } from '@prisma/client';
import { CharacterWithImage } from './dto/character-with-image.dto';

@Injectable()
export class CharactersService {
    constructor(private characterRepo: CharactersRepository) {}

    /**
     * Lists all characters.
     * @returns The list of characters.
     */
    async listAllCharacters() : Promise<CharacterWithImage[]> {
        const characters = await this.characterRepo.getAll();

        if(!characters || characters.length === 0) {
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
    async getCharacter(id: string) : Promise<CharacterWithImage> {
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
    async createCharacter(data: CreateCharacterData) : Promise<Character> {
        return await this.characterRepo.create(data);
    }

    /**
     * Update a character
     * 
     * @param id Identifier of the character 
     * @param data The information to update
     * @returns The updated character
     */
    async updateCharacter(id: string, data: UpdateCharacterData) : Promise<Character> {
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
