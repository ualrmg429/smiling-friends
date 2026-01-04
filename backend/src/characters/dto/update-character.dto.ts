import { IsString, IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class UpdateCharacterDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    species?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}