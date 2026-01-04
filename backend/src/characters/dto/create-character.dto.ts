import { IsString, IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    species: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}