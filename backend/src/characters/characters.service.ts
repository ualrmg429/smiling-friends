import { Injectable, NotFoundException } from '@nestjs/common';
import { CharactersRepository } from './characters.repository';
import { CreateCharacterData, UpdateCharacterData } from './interfaces/characters.interface';
import { Character } from '@prisma/client';
import { CharacterWithImage } from './dto/character-with-image.dto';
import type { Multer } from 'multer';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class CharactersService {
    constructor(private characterRepo: CharactersRepository, private storageServ: StorageService) {}

    /**
     * Lists all characters.
     * @returns The list of characters.
     */
    async listAllCharacters() : Promise<CharacterWithImage[] | null> {
        const characters = await this.characterRepo.getAll();

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
    async createCharacter(data: CreateCharacterData, image?: Multer.File) : Promise<Character> {
        if (image) {
            const imageUrl = await this.storageServ.uploadImage(image);
            data.imageUrl = imageUrl;
        }
        
        return await this.characterRepo.create(data);
    }

    /**
     * Update a character
     * 
     * @param id Identifier of the character 
     * @param data The information to update
     * @returns The updated character
     */
    async updateCharacter(id: string, data: UpdateCharacterData, image?: Multer.File) : Promise<Character> {
        const character = await this.characterRepo.findById(id);
        
        if(!character) {
            throw new NotFoundException('There is not any character with the id:' + id);
        }

        if (image) {
            const imageUrl = await this.storageServ.uploadImage(image);
            data.imageUrl = imageUrl;
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
