import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCharacterData, CreateCharacterData } from './interfaces/characters.interface';
import { Character } from '@prisma/client';
import { CharacterWithImage } from './dto/character-with-image.dto';
import type { Multer } from 'multer';

@Injectable()
export class CharactersRepository {
    constructor(private prisma: PrismaService) {}

    /**
     * Returns a character in the database.
     * 
     * @param id The identifier of the character
     * @returns The character with the id
     */
    findById(id : string) : Promise<CharacterWithImage | null> {
        return this.prisma.character.findUnique({ where: { id },
        include: { image: true } });
    }

    /**
     * Returns all characters in the database.
     * 
     * @returns The operation of finding
     */
    getAll() : Promise<CharacterWithImage[] | null> {
        return this.prisma.character.findMany({ include: { image: true } });
    }

    /**
     * Create a character.
     * 
     * @param data The basic information of the character
     * @returns The operation of creation
     */
    create(data: CreateCharacterData): Promise<Character> { 
        const { imageUrl, ...characterData } = data;

        // If there is an imageUrl, create with transaction
        if (imageUrl) {
            return this.prisma.$transaction(async (tx) => {
                const image = await tx.image.create({
                    data: { url: imageUrl }
                });

                return tx.character.create({
                    data: {
                        ...characterData,
                        imageId: image.id
                    },
                    include: { image: true },
                });
            });
        } 

        // If there is no imageUrl, create normally
        return this.prisma.character.create({ 
            data: characterData,
            include: { image: true },
        });
    }

    /**
     * Update a character and opcionally their image.
     *
     * @param characterId The identifier of the character
     * @param data The information to upload
     * @param imageUrl New URL of the image
     * @returns The character updated
     */
    update(characterId: string, data: UpdateCharacterData): Promise<Character> {
        const { imageUrl, ...characterData } = data;

        // If there is an image, use transaction
        if (imageUrl) { 
            return this.prisma.$transaction(async (tx) => {
                const image = await tx.image.create({ data: { url: imageUrl } });
                
                return tx.character.update({
                    where: { id: characterId },
                    data: { 
                        ...characterData,  
                        imageId: image.id 
                    },
                    include: { image: true },
                });
            });
        }

        // If there is no image, updates the character
        return this.prisma.character.update({
            where: { id: characterId },
            data: characterData,  // ← Sin imageUrl
            include: { image: true },
        });
    }
    

    
    /**
     * Delete a character and the image if it exists.
     * @param id The character id
     * @returns The operation of delete
     */
    delete(id: string) {
        return this.prisma.$transaction(async (tx) => {
            const character = await tx.character.findUnique({
                where: { id },
            });

            if (character?.imageId) {
                await tx.image.delete({
                where: { id: character.imageId },
                });
            }

            return tx.character.delete({
                where: { id },
            });
        });
    }
}
