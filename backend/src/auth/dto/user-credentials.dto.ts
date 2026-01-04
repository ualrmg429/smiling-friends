import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from "class-validator";

export class UserCredentialsDto {
    
    @ApiProperty({
        description: "Users email",
        maxLength: 50,
        example: 'pimpimplin@email.us'
    })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @ApiProperty({
        description: "Users password",
        maxLength: 50,
        example: 'Hello_MrFrog9'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @IsNotEmpty()
    @MaxLength(100)
    password: string;

}